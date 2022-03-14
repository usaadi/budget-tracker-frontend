import { useState } from "react";
import { Link } from "react-router-dom";

const links = [
  {
    title: "Github",
    url: "//github.io/jo_geek",
  },
  {
    title: "Stackoverflow",
    url: "http://stackoverflow.com/users/4084003/",
  },
];

/// A customizable responsive navbar component that depends on react-router-dom and tailwind CSS
const NavbarResponsive = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const linkClass = `hover:tw-bg-black/20 tw-inline-flex-center tw-px-10px sm-max:tw-block sm-max:tw-w-full
    sm-max:tw-py-5px md:tw-h-full`;
  const spanClass = `sm-max:tw-block sm-max:tw-w-25px sm-max:tw-h-10px 
    sm-max:tw-border-t-2 sm-max:tw-border-solid sm-max:tw-border-black/80`;
  const labelsClass = showDropdown ? "sm-max:tw-bg-bt-dark-beige" : "";
  const navLinksClass = showDropdown
    ? "sm-max:tw-max-h-500px sm-max:tw-overflow-y-auto"
    : "sm-max:tw-max-h-0 sm-max:tw-overflow-y-hidden";

  return (
    <div className="tw-bg-bt-beige-1 tw-h-50px tw-relative tw-flex tw-items-center tw-text-black/80">
      {/* <input type="checkbox" id="nav-check" className="tw-hidden tw-group" /> */}
      <div className="tw-inline-flex-center tw-h-full tw-px-10px">
        <div className="tw-inline-block tw-text-20px ">Budget Tracker</div>
      </div>
      <div
        className="tw-hidden sm-max:tw-inline-block sm-max:tw-absolute 
        sm-max:tw-top-0 sm-max:tw-right-0"
      >
        <label
          //   for="nav-check"
          onClick={() => setShowDropdown(!showDropdown)}
          className={`${labelsClass} sm-max:tw-inline-block sm-max:tw-w-50px sm-max:tw-h-50px
            sm-max:tw-p-15px sm-max:hover:tw-bg-black/20`}
        >
          <span className={spanClass}></span>
          <span className={spanClass}></span>
          <span className={spanClass}></span>
        </label>
      </div>
      <div
        className={`${navLinksClass} tw-grow tw-text-18px tw-inline-flex tw-justify-end tw-items-stretch
            sm-max:tw-block sm-max:tw-absolute sm-max:tw-bg-bt-dark-beige sm-max:tw-w-full md:tw-h-full
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
        {/* <a className={linkClass} href="//github.io/jo_geek" target="_blank">
          Github
        </a>
        <a
          className={linkClass}
          href="http://stackoverflow.com/users/4084003/"
          target="_blank"
        >
          Stackoverflow
        </a>
        <a
          className={linkClass}
          href="https://in.linkedin.com/in/jonesvinothjoseph"
          target="_blank"
        >
          LinkedIn
        </a>
        <a
          className={linkClass}
          href="https://codepen.io/jo_Geek/"
          target="_blank"
        >
          Codepen
        </a>
        <a
          className={linkClass}
          href="https://jsfiddle.net/user/jo_Geek/"
          target="_blank"
        >
          JsFiddle
        </a> */}
      </div>
    </div>
  );
};

export default NavbarResponsive;
