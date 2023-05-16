export type LanguageSelector = {
  title: string;
  lang: string;
  value: Locale["locale"];
};

export type Locale = {
  locale: "en" | "cs";
};

export const languageSelector: LanguageSelector[] = [
  {
    title: "English",
    lang: "en",
    value: "en",
  },
  {
    title: "Čeština",
    lang: "cs",
    value: "cs",
  },
];
