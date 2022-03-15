import NavbarResponsive from "../../lib/components/NavbarResponsive";
import { useAuth0 } from "@auth0/auth0-react";

import AuthenticationButton from "./AuthenticationButton";

const bgColorClass = "tw-bg-bt-beige-1";
const textColorClass = "tw-text-black/80";
const linkHoverColorClass = "hover:tw-bg-black/20";
const hamburgerSmBgColorClass = "sm-max:tw-bg-bt-dark-beige";
const hamburgerSmHoverBgColorClass = "sm-max:hover:tw-bg-bt-dark-beige";
const hamburgerSmBorderColorClass = "sm-max:tw-border-black/80";

const Navbar = () => {
  const { isAuthenticated } = useAuth0();

  const items = [
    {
      title: "Home",
      url: "/",
    },
    {
      isHidden: !isAuthenticated,
      title: "App",
      url: "/app",
    },
    {
      isComponent: true,
      component: <AuthenticationButton />,
      className: "tw-mr-15px tw-ml-5px tw-flex-center",
    },
  ];

  return (
    <div>
      <NavbarResponsive
        bgColorClass={bgColorClass}
        textColorClass={textColorClass}
        linkHoverColorClass={linkHoverColorClass}
        hamburgerSmBgColorClass={hamburgerSmBgColorClass}
        hamburgerSmHoverBgColorClass={hamburgerSmHoverBgColorClass}
        hamburgerSmBorderColorClass={hamburgerSmBorderColorClass}
        items={items}
      />
    </div>
  );
};

export default Navbar;
