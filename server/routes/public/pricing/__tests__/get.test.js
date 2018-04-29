const mockingoose = require('mockingoose').default;
const get = require('../get');
const PricingData = require('../../../../models/pricingData');

const findOneSpy = jest.spyOn(PricingData, 'findOne');

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

test('should return empty json is coupon was not found', () => {
  mockingoose.PricingData.toReturn(undefined, 'findOne');
  return get(req, res)
    .then(() => {
      expect(res.json).toHaveBeenCalled();
      expect(res.json.mock.calls[0][0]).toEqual({});
      mockingoose.PricingData.reset('find');
    });
});

