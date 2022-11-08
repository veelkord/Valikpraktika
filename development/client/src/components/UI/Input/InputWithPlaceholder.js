import { useState } from "react";
import TooltipTop from "../Tooltip/TooltipTop";
import classes from "./InputWithPlaceholder.module.css";

const InputWithPlaceholder = (props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const inputChangeHandler = (event) => {
    event.preventDefault();
    props.onChange({ name: props.name, value: event.target.value });
  };

  const mouseEnterHandler = () => {
    setShowTooltip(true);
  };
  const mouseLeaveHandler = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className={
        props.hasError || props.errorMessage > ""
          ? `${classes.container} ${classes.errorHandling}`
          : classes.container
      }
    >
      {(props.hasError || (props.errorMessage > "" && showTooltip)) && (
        <TooltipTop errorMessage={props.errorMessage} />
      )}

      <input
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        onBlur={inputChangeHandler}
        onClick={props.onClick}
        onChange={inputChangeHandler}
        type={props.type ? props.type : "text"}
        name={props.name ? props.name : ""}
        value={props.value ? props.value : ""}
        readOnly={props.readOnly ? true : false}
        className={props.hasError ? classes.errorHandling : ""}
        autoComplete="off"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default InputWithPlaceholder;
