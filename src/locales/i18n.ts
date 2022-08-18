import { createI18n } from 'vue-i18n';

import zh from './lang/zh';
import en from './lang/en';
import hk from './lang/hk';

const messages = { zh, en, hk };

const i18n = createI18n({
    locale: sessionStorage.getItem('lang') || 'zh',
    messages,
    globalInjection: true,
})

export default i18n;