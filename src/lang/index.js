// import { addLocaleData } from 'react-intl';
import en_US from './en_US';
import vi_VN from './vi_VN';
// import {createIntl, createIntlCache, RawIntlProvider} from 'react-intl'

// // This is optional but highly recommended
// // since it prevents memory leak
// const cache = createIntlCache()

// const intl = createIntl({
//   locale: 'fr-FR',
//   messages: {}
// }, cache)

const enLang = {
  messages: {
    ...en_US,
  },
  locale: 'en-US',
};

const viLang = {
  messages: {
    ...vi_VN,
  },
  locale: 'vi-VN',
};

const AppLocale = {
  en: enLang,
  vi: viLang,
};
// addLocaleData(AppLocale.en.data);
// addLocaleData(AppLocale.es.data);
// addLocaleData(AppLocale.enrtl.data);

export default AppLocale;
