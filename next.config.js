const inProd = process.env.NODE_ENV === 'production';

module.exports = {
  reactStrictMode: true,
  assetPrefix: inProd ? '/hov-frontend-engineer-onboarding-exercises/' : '',
};
