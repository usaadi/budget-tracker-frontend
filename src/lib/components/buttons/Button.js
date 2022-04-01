const Button = ({
  children,
  onClick,
  type = null,
  active = null,
  disabled = false,
  className = "",
  activeClassName = "",
  inactiveClassName = "",
  enabledClassName = "",
  disabledClassName = "",
}) => {
  const extraClassName = active ? activeClassName : inactiveClassName;
  const extraClassName2 = disabled ? disabledClassName : enabledClassName;

  return (
    <button
      className={`${className} ${extraClassName} ${extraClassName2}`}
      onClick={() => !disabled && onClick()}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
