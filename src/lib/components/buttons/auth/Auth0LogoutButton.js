import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Button";

const Auth0LogoutButton = ({
  children = "Log out",
  disabled = false,
  className = "",
  disabledClassName = "",
  enabledClassName = "",
}) => {
  const { logout } = useAuth0();
  return (
    <Button
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
      disabled={disabled}
      className={className}
      disabledClassName={disabledClassName}
      enabledClassName={enabledClassName}
    >
      {children}
    </Button>
  );
};

export default Auth0LogoutButton;
