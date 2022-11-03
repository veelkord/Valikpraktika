import classes from "./InputWithPlaceholder.module.css";

const InputWithPlaceholder = (props) => {
  const inputChangeHandler = (event) => {
    event.preventDefault();
    props.onChange({ name: props.name, value: event.target.value });
  };
  return (
    <div
      className={
        !props.hasError
          ? `${classes.container} ${classes.errorHandling}`
          : classes.container
      }
    >
      <input
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
