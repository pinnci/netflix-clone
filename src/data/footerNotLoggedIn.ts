type FooterLink = {
  title: string;
  href: string;
};

type FooterColumn = {
  column: FooterLink[];
};

type SupportContact = {
  title: string;
  phoneNumber: string;
};

export const supportContact: SupportContact = {
  title: "Questions? Call",
  phoneNumber: "1-844-505-2993",
};

export const footer: FooterColumn[] = [
  {
    column: [
      {
        title: "FAQ",
        href: "/",
      },
      {
        title: "Investor Relations",
        href: "/",
      },
      {
        title: "Buy Gift Cards",
        href: "/",
      },
      {
        title: "Cookie Preferences",
        href: "/",
      },
      {
        title: "Legal Notices",
        href: "/",
      },
    ],
  },
  {
    column: [
      {
        title: "Help Center",
        href: "/",
      },
      {
        title: "Jobs",
        href: "/",
      },
      {
        title: "Ways To Watch",
        href: "/",
      },
      {
        title: "Corporate Information",
        href: "/",
      },
      {
        title: "Only On Netflix",
        href: "/",
      },
    ],
  },
  {
    column: [
      {
        title: "Acoount",
        href: "/",
      },
      {
        title: "Netflix Shop",
        href: "/",
      },
      {
        title: "Terms Of Use",
        href: "/",
      },
      {
        title: "Contact us",
        href: "/",
      },
      {
        title: "Do Not Sell or Share My Personal Information",
        href: "/",
      },
    ],
  },
  {
    column: [
      {
        title: "Media Center",
        href: "/",
      },
      {
        title: "Redeem Gift Cards",
        href: "/",
      },
      {
        title: "Privacy",
        href: "/",
      },
      {
        title: "Speed test",
        href: "/",
      },
    ],
  },
];
