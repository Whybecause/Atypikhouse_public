const withPwa = require("next-pwa");
const runtimeCaching = require('next-pwa/cache')

module.exports = withPwa({
  images: {
    domains: [
      "i.picsum.photos",
      "lh3.googleusercontent.com",
      "cdn.pixabay.com",
      "res.cloudinary.com"
    ],
  },
  env: {
    GOOGLE_MAP_API_KEY: "",
    CLOUD_NAME:"",
    API_KEY:"",
    API_SECRET:""
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  pwa: {
    dest: 'public',
    runtimeCaching
  }
});
