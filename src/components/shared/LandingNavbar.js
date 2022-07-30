import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import Button from "../../lib/components/buttons/Button";
import AuthenticationButton from "./AuthenticationButton";

import logo from "../shared/images/logo.svg";
import { useEffect } from "react";

const title = "Budgeteeer";
//const bgColorClass = "tw-bg-bt-beige-1";
const spacingClass = "tw-py-24px tw-px-40px";
const bgColorClass = "";
const textColorClass = "tw-text-black/80";
const linkHoverColorClass = "hover:tw-bg-black/20";
const hamburgerSmBgColorClass = "sm-max:tw-bg-bt-dark-beige";
const hamburgerSmHoverBgColorClass = "sm-max:hover:tw-bg-bt-dark-beige";
const hamburgerSmBorderColorClass = "sm-max:tw-border-black/80";

const loginClass = `tw-border tw-border-solid tw-border-black/80 tw-rounded-xl tw-px-10px 
      tw-text-16px tw-h-30px tw-inline-flex`;

const LandingNavbar = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const onAppClick = () => {
    navigate("/app/summary");
  };

  const onDemoClick = () => {
    localStorage.setItem("isDemoAccount", "true");
    navigate("/app/summary");
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/summary");
    }
  }, [isAuthenticated]);

  const items = [
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
      isHidden: isAuthenticated,
      isComponent: true,
      component: (
        <Button
          onClick={onDemoClick}
          className="tw-border tw-border-solid tw-border-black/80 tw-rounded-xl tw-px-10px 
      tw-text-16px tw-h-30px tw-inline-flex"
        >
          Demo
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
    // <NavbarResponsive
    //   title={title}
    //   logo={logo}
    //   spacingClass={spacingClass}
    //   bgColorClass={bgColorClass}
    //   textColorClass={textColorClass}
    //   linkHoverColorClass={linkHoverColorClass}
    //   hamburgerSmBgColorClass={hamburgerSmBgColorClass}
    //   hamburgerSmHoverBgColorClass={hamburgerSmHoverBgColorClass}
    //   hamburgerSmBorderColorClass={hamburgerSmBorderColorClass}
    //   items={items}
    // />
    <nav className="tw-py-24px tw-px-40px tw-text-black tw-flex tw-items-center">
      <div className={`tw-inline-flex-center tw-h-full tw-px-10px`}>
        <img src={logo} className="tw-w-39px tw-mr-10px" />
        <div
          className={`tw-inline-block tw-text-20px tw-font-semibold tw-mt-minus5px`}
        >
          {title}
        </div>
      </div>
      <div className="tw-ml-auto">
        <Button
          onClick={onDemoClick}
          className="tw-px-10px tw-mr-10px tw-text-16px tw-font-medium tw-h-30px tw-inline-flex"
        >
          Demo Log In
        </Button>
        <AuthenticationButton />
      </div>
    </nav>
  );
};

export default LandingNavbar;
