import Auth0LoginButton from "../../lib/components/buttons/auth/Auth0LoginButton";
import Auth0LogoutButton from "../../lib/components/buttons/auth/Auth0LogoutButton";
import Auth0AuthenticationButton from "../../lib/components/buttons/auth/Auth0AuthenticationButton";

const AuthenticationButton = () => {
  const loginClass = `tw-border tw-border-solid tw-border-black/80 tw-rounded-xl tw-px-10px 
      tw-text-16px tw-h-30px tw-inline-flex`;
  const className = "tw-text-14px hover:tw-text-black";
  return (
    <Auth0AuthenticationButton
      config={{
        loginButton: <Auth0LoginButton className={loginClass} />,
        logoutButton: <Auth0LogoutButton className={className} />,
      }}
    />
  );
};

export default AuthenticationButton;
