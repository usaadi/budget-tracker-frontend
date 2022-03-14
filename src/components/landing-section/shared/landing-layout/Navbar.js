import NavbarResponsive from "../../../../lib/components/NavbarResponsive";

const links = [
  {
    title: "Github",
    url: "//github.io/jo_geek",
  },
  {
    title: "Stackoverflow",
    url: "http://stackoverflow.com/users/4084003/",
  },
  {
    title: "Github",
    url: "//github.io/jo_geek",
  },
  {
    title: "Stackoverflow",
    url: "http://stackoverflow.com/users/4084003/",
  },
  {
    title: "Github",
    url: "//github.io/jo_geek",
  },
  {
    title: "Stackoverflow",
    url: "http://stackoverflow.com/users/4084003/",
  },
];

const bgColorClass = "tw-bg-bt-beige-1";
const textColorClass = "tw-text-black/80";
const linkHoverColorClass = "hover:tw-bg-black/20";
const hamburgerSmBgColorClass = "sm-max:tw-bg-bt-dark-beige";
const hamburgerSmHoverBgColorClass = "sm-max:hover:tw-bg-bt-dark-beige";
const hamburgerSmBorderColorClass = "sm-max:tw-border-black/80";

const Navbar = () => {
  return (
    <div>
      <NavbarResponsive
        bgColorClass={bgColorClass}
        textColorClass={textColorClass}
        linkHoverColorClass={linkHoverColorClass}
        hamburgerSmBgColorClass={hamburgerSmBgColorClass}
        hamburgerSmHoverBgColorClass={hamburgerSmHoverBgColorClass}
        hamburgerSmBorderColorClass={hamburgerSmBorderColorClass}
        links={links}
      />
    </div>
  );
};

export default Navbar;
