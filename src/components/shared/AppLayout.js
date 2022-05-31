import { useState } from "react";

import SideBar from "./components/SideBar";
import Header from "./components/Header";

import { transactionTypeEnum } from "../../constants/enums";

const AppLayout = ({ children, activeDateRange, setActiveDateRange }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedTxType, setSelectedTxType] = useState(
    transactionTypeEnum.income
  );

  return (
    <div className="tw-flex tw-min-h-[100vh] tw-font-satoshi">
      <SideBar
        showPopup={showMobileMenu}
        onClose={() => setShowMobileMenu(!showMobileMenu)}
      />
      <div className="tw-grow tw-flex">
        <div className="tw-flex tw-flex-col tw-w-full tw-pt-12px tw-px-16px lg:tw-pt-32px lg:tw-px-40px">
          <Header
            selectedTxType={selectedTxType}
            setSelectedTxType={setSelectedTxType}
            onMenuClick={(prev) => setShowMobileMenu(!prev)}
            activeDateRange={activeDateRange}
            setActiveDateRange={setActiveDateRange}
          />
          <div className="tw-h-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
