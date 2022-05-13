import { useAuth0 } from "@auth0/auth0-react";

import Button from "../../lib/components/buttons/Button";
import AppNavbar from "./AppNavbar";

import logo from "./images/logo.svg";
import signoutIcon from "./images/side-bar/signout.png";

const AppLayout = ({ children }) => {
  const appTitle = "Budgeteeer";
  const { logout } = useAuth0();
  const onSignout = () => {
    logout({
      returnTo: window.location.origin,
    });
  };
  return (
    <div className="tw-flex">
      <div className="tw-flex tw-flex-col tw-items-start tw-w-225px tw-bg-bt-blue-100 tw-min-h-[600px] tw-m-8px tw-rounded-5px">
        <div className="tw-inline-flex-center tw-pt-24px tw-pl-16px">
          <img src={logo} className="tw-w-39px tw-mr-10px" />
          <div
            className={`tw-inline-block tw-text-20px tw-font-semibold tw-mt-minus5px`}
          >
            {appTitle}
          </div>
        </div>
        <AppNavbar className="tw-mt-30px tw-self-stretch tw-select-none" />
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
      <div className="tw-grow">{children}</div>
    </div>
  );
};

export default AppLayout;
