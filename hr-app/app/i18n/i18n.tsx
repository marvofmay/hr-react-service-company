import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './locales/en.json';
import navigationPL from './locales/pl/navigation.json';
import commonPL from './locales/pl/common.json';
import companyPL from './locales/pl/company.json';
import departmentPL from './locales/pl/department.json';
import industryPL from './locales/pl/industry.json';
import rolePL from './locales/pl/role.json';
import positionPL from './locales/pl/position.json';
import employeePL from './locales/pl/employee.json';
import validationPL from './locales/pl/validation.json';
import notificationPL from './locales/pl/notification.json';
import contractTypePL from './locales/pl/contractType.json';
import userProfilePL from './locales/pl/userProfile.json';

const resources = {
    en: {
        translation: en
    },
    pl: {
        translation: {
            common: commonPL,
            navigation: navigationPL,
            company: companyPL,
            department: departmentPL,
            industry: industryPL,
            role: rolePL,
            position: positionPL,
            employee: employeePL,
            validation: validationPL,
            notification: notificationPL,
            contractType: contractTypePL,
            userProfile: userProfilePL
        }
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        lng: "pl",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;