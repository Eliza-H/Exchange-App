import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

export default i18next.use(initReactI18next).init({
  lng: 'en',
  debug: false,
  fallbackLng: ['en'],
  resources: {
    en: {
      translation: {
        sellTitle: 'Sell {{currency}}',
        buyTitle: 'Buy {{currency}}',
        balance: 'Balance:',
        marketOrderAt: 'Market order at {{base}} = {{target}}',
        sellButton: 'Sell {{base}} to {{target}}',
        buyButton: 'Buy {{base}} with {{target}}',
        exceedBalance: 'exceed balance'
      }
    }
  }
});
