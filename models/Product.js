const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a product title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0
  },
  category: {
    type: String,
    enum: ['books', 'courses', 'templates', 'software', 'graphics', 'music', 'videos', 'tools', 'other'],
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  images: [String],
  fileType: {
    type: String,
    enum: ['pdf', 'zip', 'mp4', 'mp3', 'psd', 'ai', 'figma', 'exe', 'dmg', 'other'],
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  downloadUrl: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    userId: mongoose.Schema.Types.ObjectId,
    userName: String,
    rating: Number,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  downloads: {
    type: Number,
    default: 0
  },
  sales: {
    type: Number,
    default: 0
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [String],
  stock: {
    type: Number,
    default: 9999
  },
  unlimitedStock: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
