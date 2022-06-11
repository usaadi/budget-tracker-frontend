const ModalOverlay = ({ children }) => {
  return (
    <div
      className="tw-fixed tw-w-full tw-h-full tw-top-0 tw-left-0 tw-z-[1000]
          tw-bg-bt-black/50 tw-flex tw-justify-center tw-items-center"
    >
      {children}
    </div>
  );
};

export default ModalOverlay;
