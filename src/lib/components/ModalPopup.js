import { useRef } from "react";

import Button from "./buttons/Button";

import closeIcon from "../images/popup-close.svg";

const ModalPopup = ({ removePopup, children }) => {
  const popupRef = useRef();
  const onOverlayClick = (e) => {
    if (popupRef && popupRef.current && popupRef.current.contains(e.target)) {
      return;
    }
    removePopup();
  };
  return (
    <div onClick={onOverlayClick} className="tw-modal-overlay">
      <div ref={popupRef} className="tw-bg-white tw-rounded-30px">
        <div className="tw-px-15px tw-pt-12px tw-pb-4px tw-flex tw-justify-end tw-items-center">
          <Button onClick={removePopup}>
            <img src={closeIcon} />
          </Button>
        </div>
        <div className="tw-px-10px tw-py-10px">{children}</div>
      </div>
    </div>
  );
};

export default ModalPopup;
