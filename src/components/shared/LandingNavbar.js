import NavbarResponsive from "../../lib/components/NavbarResponsive";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import Button from "../../lib/components/buttons/Button";
import AuthenticationButton from "./AuthenticationButton";

const bgColorClass = "tw-bg-bt-beige-1";
const textColorClass = "tw-text-black/80";
const linkHoverColorClass = "hover:tw-bg-black/20";
const hamburgerSmBgColorClass = "sm-max:tw-bg-bt-dark-beige";
const hamburgerSmHoverBgColorClass = "sm-max:hover:tw-bg-bt-dark-beige";
const hamburgerSmBorderColorClass = "sm-max:tw-border-black/80";

const loginClass = `tw-border tw-border-solid tw-border-black/80 tw-rounded-xl tw-px-10px 
      tw-text-16px tw-h-30px tw-inline-flex`;

const LandingNavbar = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const onAppClick = () => {
    navigate("/app");
  };

  const items = [
    {
      title: "Home",
      url: "/",
    },
    {
      isHidden: !isAuthenticated,
      isComponent: true,
      component: (
        <Button
          onClick={onAppClick}
          className="tw-border tw-border-solid tw-border-black/80 tw-rounded-xl tw-px-10px 
      tw-text-16px tw-h-30px tw-inline-flex"
        >
          App
        </Button>
      ),
      className: `tw-flex-center tw-mx-5px`,
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

export default LandingNavbar;