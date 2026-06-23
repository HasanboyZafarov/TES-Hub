import { Link } from "react-router-dom";

interface FooterLink {
  name: string;
  url: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterLogo {
  url: string;
  src: string;
  alt: string;
  title: string;
}

interface FooterBasicProps {
  logo?: FooterLogo;
  description?: string;
  sections?: FooterSection[];
  copyright?: string;
  legalLinks?: FooterLink[];
  className?: string;
}

interface Footer2Props extends FooterBasicProps {
  logoClassName?: string;
}
type Props = Partial<Footer2Props>;

const defaultProps: Footer2Props = {
  description:
    "© 2024 TES Knowledge Hub. Empowering Kyrgyz agriculture through traditional wisdom and modern science.",
  sections: [
    {
      title: "Academy",
      links: [
        { name: "Articles", url: "/academy/articles" },
        { name: "Courses", url: "/academy/courses" },
      ],
    },
    {
      title: "Coommunity",
      links: [
        { name: "Stories", url: "/community/stories" },
        { name: "Questions", url: "/community/questions" },
        { name: "Photos", url: "/community/photos" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact", url: "/contact" },
        { name: "Terms of use", url: "/terms-of-use" },
        { name: "Privacy Policy", url: "/privacy-policy" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Sessions", url: "/sessions" },
        { name: "Templates", url: "#" },
        { name: "Sales", url: "#" },
        { name: "Advertise", url: "#" },
      ],
    },
  ],
  copyright: "Made with ❤️ by David",
};

const MAX_SECTIONS = 4;

const Footer = (props: Props) => {
  const { description, sections, copyright, className } = {
    ...defaultProps,
    ...props,
  };

  const visibleSections = (sections ?? []).slice(0, MAX_SECTIONS);

  return (
    <footer className={`border-t border-b bg-[#F8FAF8] py-5 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
          <div className="col-span-2 mb-8 lg:mb-0">
            <div className="flex items-center lg:justify-start">
              <Link to={"/"} className="text-2xl font-bold text-[#012D1D]">
                TES Hub
              </Link>
            </div>
            <p className="mt-4 text-sm font-medium text-muted-foreground">
              {description}
            </p>
          </div>
          {visibleSections.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h3 className="mb-4 text-sm font-semibold tracking-tight">
                {section.title}
              </h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx} className="font-medium hover:text-primary">
                    <Link to={link.url}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 pt-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
