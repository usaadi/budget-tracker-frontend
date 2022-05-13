import LandingNavbar from "./LandingNavbar";

const LandingLayout = ({ children }) => {
  return (
    <div className="tw-select-none tw-bg-landing-page-gradient">
      <LandingNavbar />
      {children}
    </div>
  );
};

export default LandingLayout;
