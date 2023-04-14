module.exports = {
  i18n: {
    defaultLocale: 'zh',
    locales: [
      'bn',
      'de',
      'en',
      'es',
      'fr',
      'he',
      'id',
      'it',
      'ja',
      'ko',
      'pl',
      'pt',
      'ru',
      'ro',
      'sv',
      'te',
      'vi',
      'zh',
      'ar',
    ],
  },
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/public/locales',
};
