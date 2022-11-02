import classes from "./InputWithLabel.module.css";

const InputWithLabel = (props) => {
  const inputChangeHandler = (event) => {
    event.preventDefault();
    props.onChange(event.target.value);
  };
  return (
    <div
      className={
        props.hasError
          ? `${classes.container} ${classes.errorHandling}`
          : classes.container
      }
    >
      {props.index === 0 && <label>{props.label ? props.label : ""}</label>}
      <input
        onClick={props.onClick}
        onChange={inputChangeHandler}
        type={props.type ? props.type : "text"}
        name={props.name ? props.name : ""}
        value={props.value ? props.value : ""}
        readOnly={props.readOnly ? true : false}
        className={props.hasError ? classes.errorHandling : ""}
        autoComplete="off"
      />
    </div>
  );
};

export default InputWithLabel;
