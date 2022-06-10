import Button from "../../../../lib/components/buttons/Button";

const XButton = ({ onClick, children, className }) => {
  return (
    <Button
      onClick={onClick}
      className={`${className} tw-bg-bt-blue-500 tw-text-white tw-h-40px tw-px-16px tw-rounded-5px`}
    >
      {children}
    </Button>
  );
};

export default XButton;
