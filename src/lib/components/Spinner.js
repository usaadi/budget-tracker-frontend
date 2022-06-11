const Spinner = ({
  className,
  strokeColor,
  strokeWidth = "8",
  widthClass = "tw-w-22px",
  marginClass = "tw-mr-10px",
  spinClass = "tw-animate-spin",
}) => {
  let sColor;

  if (!strokeColor) {
    sColor = "white";
  } else {
    sColor = strokeColor;
  }

  return (
    <svg
      className={`${className} ${widthClass} ${marginClass} ${spinClass}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke={sColor}
        strokeWidth={strokeWidth}
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
        transform="matrix(1,0,0,1,0,0)"
      ></circle>
    </svg>
  );
};

export default Spinner;
