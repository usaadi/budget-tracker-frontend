import { useState } from "react";
import { Link } from "react-router-dom";

const linksSample = [
  {
    title: "Github",
    url: "//github.io/jo_geek",
  },
  {
    title: "Stackoverflow",
    url: "http://stackoverflow.com/users/4084003/",
  },
  {
    title: "Github",
    url: "//github.io/jo_geek",
  },
  {
    title: "Stackoverflow",
    url: "http://stackoverflow.com/users/4084003/",
  },
  {
    title: "Github",
    url: "//github.io/jo_geek",
  },
  {
    title: "Stackoverflow",
    url: "http://stackoverflow.com/users/4084003/",
  },
];

const bgColorClassSample = "tw-bg-bt-beige-1";
const textColorClassSample = "tw-text-black/80";
const linkHoverColorClassSample = "hover:tw-bg-black/20";
const hamburgerSmBgColorClassSample = "sm-max:tw-bg-bt-dark-beige";
const hamburgerSmHoverBgColorClassSample = "sm-max:hover:tw-bg-bt-dark-beige";
const hamburgerSmBorderColorClassSample = "sm-max:tw-border-black/80";

/// A customizable responsive navbar component that depends on react-router-dom and tailwind CSS
/// Also depends on a custom tailwind screen size using max-size:
/// (sm-max) which should be the inverse of (md)

const NavbarResponsive = ({
  bgColorClass = bgColorClassSample,
  textColorClass = textColorClassSample,
  linkHoverColorClass = linkHoverColorClassSample,
  hamburgerSmBgColorClass = hamburgerSmBgColorClassSample,
  hamburgerSmHoverBgColorClass = hamburgerSmHoverBgColorClassSample,
  hamburgerSmBorderColorClass = hamburgerSmBorderColorClassSample,
  links = linksSample,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const linkClass = `${linkHoverColorClass} tw-inline-flex-center tw-px-10px sm-max:tw-block sm-max:tw-w-full
    sm-max:tw-py-5px md:tw-h-full`;
  const spanClass = `sm-max:tw-block sm-max:tw-w-25px sm-max:tw-h-10px 
    sm-max:tw-border-t-2 sm-max:tw-border-solid`;
  const spanBorderClass = hamburgerSmBorderColorClass;
  const labelsClass = showDropdown ? hamburgerSmBgColorClass : "";
  const navLinksClass__ = showDropdown
    ? "sm-max:tw-max-h-500px sm-max:tw-overflow-y-auto"
    : "sm-max:tw-max-h-0 sm-max:tw-overflow-y-hidden";
  const navLinksClass = showDropdown
    ? "sm-max:tw-max-h-500px"
    : "sm-max:tw-max-h-0";
  //const hamburgerSmHoverBgColorClass = "sm-max:hover:" + hamburgerBgColorClass;
  //const hamburgerSmBgColorClass = "sm-max:" + hamburgerBgColorClass;

  return (
    <div
      className={`${bgColorClass} ${textColorClass} tw-h-50px tw-relative tw-flex tw-items-center`}
    >
      <div className={`tw-inline-flex-center tw-h-full tw-px-10px`}>
        <div className={`tw-inline-block tw-text-20px`}>Budget Tracker</div>
      </div>
      <div
        className={`tw-hidden sm-max:tw-inline-block sm-max:tw-absolute 
        sm-max:tw-top-0 sm-max:tw-right-0`}
      >
        <label
          onClick={() => setShowDropdown(!showDropdown)}
          className={`${labelsClass} ${hamburgerSmHoverBgColorClass} sm-max:tw-inline-block sm-max:tw-w-50px sm-max:tw-h-50px
            sm-max:tw-p-15px`}
        >
          <span className={`${spanClass} ${spanBorderClass}`}></span>
          <span className={`${spanClass} ${spanBorderClass}`}></span>
          <span className={`${spanClass} ${spanBorderClass}`}></span>
        </label>
      </div>
      <div
        className={`${navLinksClass} ${hamburgerSmBgColorClass} tw-grow tw-text-18px tw-inline-flex tw-justify-end tw-items-stretch
            sm-max:tw-block sm-max:tw-absolute sm-max:tw-w-full md:tw-h-full sm-max:tw-overflow-hidden
            sm-max:tw-transition-all sm-max:tw-duration-300 sm-max:tw-ease-in
            sm-max:tw-top-50px sm-max:tw-left-0`}
      >
        <>
          {links?.map((item, index) => {
            return (
              <Link key={index} to={item.url} className={linkClass}>
                {item.title}
              </Link>
            );
          })}
        </>
      </div>
    </div>
  );
};

export default NavbarResponsive;
