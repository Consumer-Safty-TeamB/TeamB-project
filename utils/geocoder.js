const NodeGeocoder = require('node-geocoder');

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: 'AIzaSyDYrZmehs4hbg8D3f0Qn9XT1Wpox7zt85Y',
  formatter: null 
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;

