import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Button";

const Auth0LoginButton = ({
  children = "Log In",
  disabled = false,
  className = "",
  disabledClassName = "",
  enabledClassName = "",
}) => {
  const { location } = useLocation();
  const { loginWithRedirect } = useAuth0();
  const redirectUri = window.location.origin + "/app/summary";
  return (
    <Button
      onClick={() => loginWithRedirect({ redirectUri: redirectUri })}
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
