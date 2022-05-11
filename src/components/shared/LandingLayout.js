import LandingNavbar from "./LandingNavbar";

const LandingLayout = ({ children }) => {
  return (
    <div className="tw-select-none">
      <LandingNavbar />
      {children}
    </div>
  );
};

export default LandingLayout;
