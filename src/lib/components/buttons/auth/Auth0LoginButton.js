import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Button";

const Auth0LoginButton = ({
  children = "Log In",
  disabled = false,
  className = "",
  disabledClassName = "",
  enabledClassName = "",
}) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      onClick={() => loginWithRedirect()}
      disabled={disabled}
      className={className}
      disabledClassName={disabledClassName}
      enabledClassName={enabledClassName}
    >
      {children}
    </Button>
  );
};

export default Auth0LoginButton;
