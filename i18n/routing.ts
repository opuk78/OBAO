import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en", "nl", "fr"],

  pathnames: {
    "/about-us": {
      en: "/about-us",
      nl: "/over-ons",
      fr: "/a-propos-de-nous",
    },
    "/menu": {
      en: "/menu",
      nl: "/menu",
      fr: "/carte",
    },
    "/catering": {
      en: "/catering",
      nl: "/catering",
      fr: "/traiteur",
    },
  },
  defaultLocale: "en",
})
