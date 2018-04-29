const mongoose = require('mongoose');

const pricingDataSchema = mongoose.Schema({
  couponName: {
    type: String,
    index: true,
    unique: true,
  },
  pricingData: {
    type: mongoose.Schema.Types.Mixed,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PricingData', pricingDataSchema);
