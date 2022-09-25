import { useState } from "react";

import SideBar from "./components/SideBar";
import Header from "./components/Header";
import AddServer from "./AdServer";

import Footer from "./Footer";

const AppLayout = ({
  children,
  activeDateRange,
  setActiveDateRange,
  selectedTxType,
  setSelectedTxType,
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  // const [selectedTxType, setSelectedTxType] = useState(
  //   transactionTypeEnum.income
  // );

  return (
    <div className="tw-flex tw-min-h-[100vh] tw-max-h-[100vh] tw-font-satoshi">
      <SideBar showPopup={showMobileMenu} onClose={() => setShowMobileMenu(!showMobileMenu)} />
      <div className="tw-grow tw-flex tw-max-h-[100vh] lg:tw-overflow-auto">
        <div className="tw-flex tw-flex-col tw-items-stretch tw-w-full tw-h-full tw-pt-12px tw-px-16px lg:tw-pt-32px lg:tw-px-40px">
          <AddServer />
          <Header
            selectedTxType={selectedTxType}
            setSelectedTxType={setSelectedTxType}
            onMenuClick={(prev) => setShowMobileMenu(!prev)}
            activeDateRange={activeDateRange}
            setActiveDateRange={setActiveDateRange}
          />
          <div className="tw-grow tw-flex tw-flex-col tw-overflow-hidden lg:tw-overflow-visible">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
