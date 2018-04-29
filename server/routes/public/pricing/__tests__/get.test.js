const mockingoose = require('mockingoose').default;
const get = require('../get');
const PricingData = require('../../../../models/pricingData');
const redis = require('../../../../config/cache/redis');

const findOneSpy = jest.spyOn(PricingData, 'findOne');

redis.setex = jest.fn().mockImplementation(() => Promise.resolve());

beforeEach(() => {
  mockingoose.resetAll();
  jest.clearAllMocks();
});

let req;
let res;
let defaultPricing;
beforeEach(() => {
  req = {
    query: {
      coupon: null,
    },
  };
  res = {
    json: jest.fn(),
  };
  defaultPricing = {
    couponName: null,
    pricingData: {
      price: 1000,
    },
    createdAt: (new Date(Date.now())).toISOString(),
  };
});

test('should fetch data from pricingData collection', () => {
  mockingoose.PricingData.toReturn(defaultPricing, 'findOne');
  return get(req, res)
    .then(() => {
      expect(findOneSpy).toHaveBeenCalledWith({ couponName: '' });
      mockingoose.PricingData.reset('find');
      findOneSpy.mockReset();
      findOneSpy.mockRestore();
    });
});

test('should return json with returned coupon', () => {
  const couponName = 'Test coupon name';
  req.query.coupon = couponName;
  defaultPricing.couponName = couponName;
  mockingoose.PricingData.toReturn(defaultPricing, 'findOne');
  return get(req, res)
    .then(() => {
      expect(res.json).toHaveBeenCalled();
      expect(res.json.mock.calls[0][0]).toEqual(defaultPricing);
      mockingoose.PricingData.reset('find');
    });
});

test('should cache resulted json to redis for 1 hour', () => {
  const couponName = 'Test coupon name';
  req.query.coupon = couponName;
  defaultPricing.couponName = couponName;
  mockingoose.PricingData.toReturn(defaultPricing, 'findOne');
  return get(req, res)
    .then(() => {
      const key = ['query', 'coupon', couponName].join(':');
      expect(redis.setex).toHaveBeenCalledWith(key, 3600, JSON.stringify(defaultPricing));
      mockingoose.PricingData.reset('find');
    });
});

test('should return empty json if coupon was not found', () => {
  mockingoose.PricingData.toReturn(undefined, 'findOne');
  return get(req, res)
    .then(() => {
      expect(res.json).toHaveBeenCalled();
      expect(res.json.mock.calls[0][0]).toEqual({});
      mockingoose.PricingData.reset('find');
    });
});

