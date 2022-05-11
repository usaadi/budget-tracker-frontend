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

  const {
    title,
    message,
    yesText,
    noText,
    isOpen = false,
    proceed,
    cancel,
  } = useConfirm();

  const visibilityClass = isOpen ? "tw-block" : "tw-hidden";

  return (
    <div className={`${visibilityClass}`}>
      <div onClick={onOverlayClick} className={`tw-modal-overlay`}>
        <div
          ref={popupRef}
          className="tw-w-[611px] tw-h-[269px] tw-bg-white tw-rounded-30px tw-overflow-hidden
            tw-flex tw-flex-col tw-pt-27px tw-pr-28px tw-pb-40px tw-pl-40px tw-gap-12px
            tw-select-none"
        >
          <div className="tw-flex tw-justify-end">
            <img
              className="tw-cursor-pointer"
              src={closeIcon}
              onClick={cancel}
            />
          </div>
          <div className="tw-text-db-black-2 tw-text-28px tw-leading-none">
            {title}
          </div>
          <div className="tw-text-db-blue-gray-1 tw-text-16px tw-leading-none">
            {message}
          </div>
          <div className="tw-mt-auto tw-flex tw-justify-between">
            <div
              onClick={cancel}
              className="tw-w-[259px] tw-h-50px tw-bg-gradient-to-b tw-from-db-blue-7 tw-to-db-blue-8
          tw-rounded-25px tw-text-18px tw-font-roboto tw-font-[500] tw-text-white
          tw-flex tw-justify-center tw-items-center tw-select-none tw-cursor-pointer"
            >
              {noText}
            </div>
            <div
              onClick={proceed}
              className="tw-w-[259px] tw-h-50px tw-rounded-25px tw-flex tw-justify-center tw-items-center
          tw-select-none tw-text-18px tw-font-roboto tw-font-[500] tw-text-db-red-1
          tw-border-2 tw-border-solid tw-border-db-red-1 tw-cursor-pointer"
            >
              {yesText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
