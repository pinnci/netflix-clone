type FooterLink = {
  title: string;
  href: string;
};

type FooterColumn = {
  column: FooterLink[];
};

type SupportContact = {
  title: string;
  href: string;
};

export const supportContact: SupportContact = {
  title: "Questions? Contact us.",
  href: "#",
};

export const footer: FooterColumn[] = [
  {
    column: [
      {
        title: "FAQ",
        href: "#",
      },
      {
        title: "Cookie Preferences",
        href: "#",
      },
    ],
  },
  {
    column: [
      {
        title: "Help Center",
        href: "#",
      },
      {
        title: "Corporate Information",
        href: "#",
      },
    ],
  },
  {
    column: [
      {
        title: "Terms of Use",
        href: "#",
      },
    ],
  },
  {
    column: [
      {
        title: "Privacy",
        href: "#",
      },
    ],
  },
];
