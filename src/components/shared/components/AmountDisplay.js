const AmountDisplay = ({ className, title, amount, icon, iconSm }) => {
  return (
    <div
      className={`${className} tw-h-[116px] lg:tw-h-104px tw-rounded-5px tw-shadow-5 tw-flex tw-overflow-hidden`}
    >
      <div className="tw-bg-bt-spring-green tw-w-104px tw-justify-center tw-items-center tw-hidden lg:tw-flex">
        <img src={icon} alt={title} />
      </div>
      <div className="tw-grow tw-flex tw-items-center tw-px-16px">
        <div className="tw-flex tw-flex-col">
          <img
            src={iconSm}
            alt={title}
            className="lg:tw-hidden tw-w-[33px] tw-mb-8px"
          />
          <span className="tw-text-20px lg:tw-text-20px tw-font-medium">
            ${amount}
          </span>
          <span className="tw-text-14px lg:tw-text-18px">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default AmountDisplay;
