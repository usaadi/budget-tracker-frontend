import { useAuth0 } from "@auth0/auth0-react";

import Button from "../../../lib/components/buttons/Button";
import AppNavbar from "../AppNavbar";

import logo from "../images/logo.svg";
import signoutIcon from "../images/side-bar/signout.png";
import closeIcon from "../images/side-bar/close.png";

import { appTitle } from "../defines/consts";

const SideBar = ({ showPopup, onClose }) => {
  const { logout } = useAuth0();
  const onSignout = () => {
    logout({
      returnTo: window.location.origin,
    });
  };
  const className = "tw-w-auto tw-h-auto";
  const hiddenClass = showPopup ? "tw-flex" : "tw-hidden";
  const overlayClass = showPopup
    ? "tw-absolute tw-w-full tw-h-full tw-bg-bt-black/50 lg:tw-static lg:tw-w-auto lg:tw-h-auto lg:tw-bg-transparent"
    : "";
  return (
    <div className={`${overlayClass} tw-flex`}>
      <div
        className={`${hiddenClass} tw-absolute tw-flex tw-items-stretch lg:tw-static tw-w-95pct tw-left-0 tw-right-0 tw-mx-auto
      lg:tw-flex tw-flex-col lg:tw-w-225px tw-bg-bt-blue-100 tw-m-8px tw-rounded-5px`}
      >
        <div className="tw-inline-flex tw-items-center tw-pt-8px tw-pl-8px lg:tw-pt-24px lg:tw-pl-16px">
          <img src={logo} className="tw-w-31px lg:tw-w-39px tw-mr-10px" />
          <div
            className={`tw-inline-block tw-text-16px lg:tw-text-20px tw-font-semibold tw-select-none`}
          >
            {appTitle}
          </div>
          <Button
            onClick={onClose}
            className="lg:tw-hidden tw-ml-auto tw-mr-14px tw-mt-[-5px]"
          >
            <img src={closeIcon} />
          </Button>
        </div>
        <AppNavbar
          closeMenu={onClose}
          className="tw-mt-30px tw-mb-48px tw-self-stretch tw-select-none"
        />
        <div className="tw-mt-auto tw-ml-20px tw-mb-24px tw-flex tw-items-center">
          <Button onClick={onSignout}>
            <img src={signoutIcon} />
          </Button>
          <Button
            onClick={onSignout}
            className="tw-text-20px tw-text-bt-gray-600 tw-ml-16px 
            tw-leading-none tw-mt-minus4px"
          >
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
