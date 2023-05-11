type FooterLink = {
  title: string;
  href: string;
};

type SupportContact = {
  title: string;
  href: string;
};

export const supportContact: SupportContact = {
  title: "Questions? Contact us.",
  href: "#",
};

export const firstColumn: FooterLink[] = [
  {
    title: "FAQ",
    href: "#",
  },
  {
    title: "Cookie Preferences",
    href: "#",
  },
];

export const secondColumn: FooterLink[] = [
  {
    title: "Help Center",
    href: "#",
  },
  {
    title: "Corporate Information",
    href: "#",
  },
];

export const thirdColumn: FooterLink[] = [
  {
    title: "Terms of Use",
    href: "#",
  },
];

export const fourthColumn: FooterLink[] = [
  {
    title: "Privacy",
    href: "#",
  },
];
