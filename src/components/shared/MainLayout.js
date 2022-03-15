import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="tw-select-none">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
