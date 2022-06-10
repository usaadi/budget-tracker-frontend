import { useState } from "react";

const StandardInput = ({
  placeholder,
  className = "",
  name,
  value,
  reset,
  clear,
  register,
  errorMessage,
  borderColorClass = "tw-border-wf-light-slate-grey-2",
  textClass = "tw-font-roboto tw-text-[1rem]",
  placeholderClass = "placeholder:text-slate-400",
  isPassword,
  autoComplete,
}) => {
  //const [input, setInput] = useState("");
  const onClear = () => {
    clear();
    //setInput("");
  };
  const type = isPassword ? "password" : "text";

  const extraBorderClass = errorMessage ? "tw-border tw-border-bt-red" : "tw-border-bt-blue-500";

  const inputClass = `${extraBorderClass} tw-h-40px tw-bg-bt-blue-100 tw-w-full tw-rounded-5px tw-px-16px tw-text-18px tw-text-bt-black 
    tw-outline-none hover:tw-border focus:tw-border tw-border-solid`;

  return (
    <div className={`form-element form-input ${className} ${value ? "has-text" : ""}`}>
      <div
      //   className={`${borderColorClass} form-input-container tw-flex tw-flex-row tw-justify-between tw-items-center tw-h-40px
      // tw-border tw-border-solid tw-rounded-[25px] tw-bg-white`}
      >
        {/* <div className="tw-w-[26px] tw-h-[50px]"></div> */}
        <input
          size={1}
          //value={input}
          //onInput={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete ? autoComplete : "off"}
          type={type}
          //name={name}
          {...register}
          className={`${inputClass} ${textClass} ${placeholderClass}`}
        />
        <div className="clear-btn" onClick={onClear}></div>
      </div>
      {errorMessage && <div className="tw-absolute tw-text-bt-red tw-text-12px">{errorMessage}</div>}
    </div>
  );
};

export default StandardInput;
