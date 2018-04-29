const mongoose = require('mongoose');

const couponSchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true,
  },
});

module.exports = mongoose.model('Coupon', couponSchema);
