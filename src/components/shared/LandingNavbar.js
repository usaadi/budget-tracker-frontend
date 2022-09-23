import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import Button from "../../lib/components/buttons/Button";
import AuthenticationButton from "./AuthenticationButton";

import logo from "../shared/images/logo.png";
import { useEffect } from "react";

const title = "Budgeteeer";

const LandingNavbar = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const onDemoClick = () => {
    localStorage.setItem("isDemoAccount", "true");
    navigate("/app/summary");
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/summary");
    }
  }, [isAuthenticated, navigate]);

  return (
    <nav className="tw-py-24px tw-px-40px tw-text-black tw-flex tw-items-center">
      <div className={`tw-inline-flex-center tw-h-full tw-px-10px`}>
        <img src={logo} alt="logo" className="tw-w-39px tw-mr-10px" />
        <div className={`tw-inline-block tw-text-20px tw-font-semibold tw-mt-minus5px`}>
          {title}
        </div>
      </div>
      <div className="tw-ml-auto">
        <AuthenticationButton />
      </div>
    </nav>
  );
};

export default LandingNavbar;
