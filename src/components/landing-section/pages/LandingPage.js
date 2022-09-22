import { useAuth0 } from "@auth0/auth0-react";

import XButton from "../../shared/components/buttons/XButton";

import screenShot from "../../shared/images/landing/screen.png";

const LandingPage = () => {
  const appTitle = "Budgeteeer";

  const { loginWithRedirect } = useAuth0();

  const onGetStarted = () => {
    loginWithRedirect();
  };

  return (
    <div>
      <header className="tw-mt-70px tw-flex tw-flex-col tw-items-center">
        <h1 className="tw-w-[22ch] tw-text-24px md:tw-text-38px lg:tw-text-56px tw-text-center tw-leading-tight">
          Be aware of what happens to{" "}
          <span
            className="tw-relative tw-z-10 tw-inline-block after:tw-absolute after:tw-block after:tw-h-12px after:tw-w-100pct 
          after:tw-bg-bt-orange after:tw-bottom-minus4px after:tw-z-[-2] after:tw-rounded-12px"
          >
            your budget
          </span>
        </h1>
        <p className="tw-w-[35ch] tw-text-14px md:tw-text-16px lg:tw-text-18px tw-text-center tw-mt-30px">
          {appTitle} offers everyone the possibility to better track their budget.
        </p>
      </header>
      <div className="tw-mt-30px tw-flex tw-flex-col tw-items-center">
        <XButton onClick={onGetStarted}>Get started</XButton>
        <img
          src={screenShot}
          alt="screenshot"
          className="tw-mt-48px tw-mb-64px tw-w-90pct md:tw-w-fit"
        />
      </div>
    </div>
  );
};

export default LandingPage;
