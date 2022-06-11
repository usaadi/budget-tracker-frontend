import LandingNavbar from "./LandingNavbar";

const LandingLayout = ({ children }) => {
  return (
    <div className="tw-select-none tw-bg-landing-page-gradient tw-font-satoshi">
      <LandingNavbar />
      {children}
    </div>
  );
};

export default LandingLayout;
