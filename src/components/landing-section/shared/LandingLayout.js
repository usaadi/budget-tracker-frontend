import Navbar from "./landing-layout/Navbar";

const LandingLayout = ({ children }) => {
  return (
    <div className="tw-select-none">
      <Navbar />
      {children}
    </div>
  );
};

export default LandingLayout;
