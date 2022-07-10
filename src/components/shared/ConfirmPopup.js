import { useRef } from "react";
import useConfirm from "../../lib/components/confirm/useConfirm";

import closeIcon from "../../lib/images/popup-close.svg";

const ConfirmPopup = () => {
  const popupRef = useRef();
  const onOverlayClick = (e) => {
    if (popupRef && popupRef.current && popupRef.current.contains(e.target)) {
      return;
    }
    cancel();
  };

  const { title, message, yesText, noText, isOpen = false, proceed, cancel } = useConfirm();

  const visibilityClass = isOpen ? "tw-block" : "tw-hidden";

  return (
    <div className={`${visibilityClass}`}>
      <div onClick={onOverlayClick} className={`tw-modal-overlay`}>
        <div
          ref={popupRef}
          className="tw-w-[600px] tw-bg-white tw-rounded-5px tw-overflow-hidden
            tw-flex tw-flex-col tw-pt-35px tw-pr-32px tw-pb-32px tw-pl-32px tw-gap-15px
            tw-select-none tw-relative tw-font-satoshi tw-mx-10px"
        >
          <img
            className="tw-absolute tw-cursor-pointer tw-right-15px tw-top-12px tw-w-12px"
            src={closeIcon}
            onClick={cancel}
          />
          <div className="tw-text-bt-black tw-text-25px tw-font-medium tw-leading-none">
            {title}
          </div>
          <div className="tw-text-bt-gray-700 tw-text-18px tw-leading-none">{message}</div>
          <div className="tw-flex tw-justify-end tw-mt-26px tw-gap-16px">
            <div
              onClick={proceed}
              className="tw-text-18px tw-font-bold tw-text-bt-red tw-select-none tw-cursor-pointer"
            >
              {yesText}
            </div>
            <div
              onClick={cancel}
              className="tw-text-18px tw-font-bold tw-text-bt-gray-600 tw-select-none tw-cursor-pointer"
            >
              {noText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
