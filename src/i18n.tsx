import { i18n } from "i18next";

export const i18nAddResourceBundles = (i18n: i18n) => {
  i18n.addResourceBundle("en", "webpanel-antd", {
    logout: "Logout",
    confirmDeleteTitle: "Are you sure?",
    confirmDeleteContent: "Do you want to delete this item?",
    yes: "Yes",
    no: "No",
  });
  i18n.addResourceBundle("cs", "webpanel-antd", {
    logout: "Odhlásit se",
    confirmDeleteTitle: "Jste si jistí?",
    confirmDeleteContent: "Opravdu chcete smazat tuto položku?",
    yes: "Ano",
    no: "Ne",
  });
};
