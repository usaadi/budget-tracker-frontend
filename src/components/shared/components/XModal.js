import closeIcon from "../../shared/images/gray-close-icon.png";

const XModal = ({ children, onClose, sizeClass = "" }) => {
  return (
    <div className={`${sizeClass} tw-bg-white lg:tw-shadow-4 lg:tw-rounded-5px tw-relative`}>
      <img
        className="tw-cursor-pointer tw-absolute tw-left-22px tw-top-22px lg:tw-right-20px lg:tw-top-18px tw-w-18px"
        src={closeIcon}
        alt="close"
        onClick={onClose}
      />
      {children}
    </div>
  );
};

export default XModal;
