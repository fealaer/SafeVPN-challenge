module.exports = (req, res) => {
  const pricing = {
    couponName: '',
    pricingData: {},
    createdAt: '',
  };
  pricing.couponName = req.query.coupon || null;
  res.json(pricing);
};
