import { useState } from "react";

const StandardInput = ({
  placeholder,
  className,
  register,
  errorMessage,
  borderColorClass = "tw-border-wf-light-slate-grey-2",
  textClass = "tw-font-roboto tw-text-[1rem]",
  placeholderClass = "placeholder:text-slate-400",
  isPassword,
  autoComplete,
}) => {
  const [input, setInput] = useState("");
  const onClear = () => {
    setInput("");
  };
  const type = isPassword ? "password" : "text";
  return (
    <div
      className={`form-element form-input ${className ? className : ""} ${
        input ? "has-text" : ""
      }`}
    >
      <div
        className={`${borderColorClass} form-input-container tw-flex tw-flex-row tw-justify-between tw-items-center tw-h-[50px] 
      tw-border tw-border-solid tw-rounded-[25px] tw-bg-white`}
      >
        <div className="tw-w-[26px] tw-h-[50px]"></div>
        <input
          size={1}
          value={input}
          onInput={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete ? autoComplete : "off"}
          type={type}
          {...register}
          className={`${textClass} ${placeholderClass}
          tw-grow tw-border-none tw-outline-none tw-bg-transparent ${
            input ? "tw-text-black" : "tw-text-wf-light-slate-grey-2"
          }`}
        />
        <div className="clear-btn" onClick={onClear}></div>
      </div>
      {errorMessage && (
        <div
          className="tw-bg-wf-warning-bg tw-text-wf-warning-text tw-text-[0.938rem] 
          tw-p-[15px] tw-rounded-[2px] tw-font-ar"
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default StandardInput;
