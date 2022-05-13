import { useState } from "react";

import SideBar from "./components/SideBar";

const AppLayout = ({ children }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(true);

  return (
    <div className="tw-flex tw-min-h-[100vh] tw-font-satoshi">
      <SideBar
        showPopup={showMobileMenu}
        onClose={() => setShowMobileMenu(!showMobileMenu)}
      />
      <div className="tw-grow">{children}</div>
    </div>
  );
};

export default AppLayout;
