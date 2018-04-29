const get = require('../get');

let req;
let res;
let pricing;
beforeEach(() => {
  req = {
    query: {
      coupon: null,
    },
  };
  res = {
    json: jest.fn(),
  };
  pricing = {
    couponName: null,
    pricingData: {},
    createdAt: '',
  };
});

test('should return json with default pricing', () => {
  get(req, res);
  expect(res.json).toHaveBeenCalledWith(pricing);
});

test('should return json with pricing which has couponName', () => {
  const couponName = 'Test coupon name';
  req.query.coupon = couponName;
  pricing.couponName = couponName;
  get(req, res);
  expect(res.json).toHaveBeenCalledWith(pricing);
});
