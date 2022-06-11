import Button from "../../../lib/components/buttons/Button";

import logo from "../images/logo.svg";
import menuIcon from "../images/ham-menu.png";

import { appTitle } from "../defines/consts";

const MobileHeader = ({ className, onMenuClick }) => {
  return (
    <div className={`${className} tw-flex tw-items-center lg:tw-hidden`}>
      <img src={logo} className="tw-w-31px tw-mr-9px" />
      <div
        className={`tw-inline-block tw-text-16px tw-font-semibold tw-select-none`}
      >
        {appTitle}
      </div>
      <Button onClick={onMenuClick} className="tw-ml-auto tw-mr-5px">
        <img src={menuIcon} />
      </Button>
    </div>
  );
};

export default MobileHeader;
