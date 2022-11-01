import classes from "./InputWithLabel.module.css";

const InputWithLabel = (props) => {
  const inputChangeHandler = (event) => {
    event.preventDefault();
    props.onChange(event.target.value);
  };
  return (
    <div className={classes.container}>
      <label>{props.label ? props.label : ""}</label>
      <input
        onClick={props.onClick}
        onChange={inputChangeHandler}
        type={props.type ? props.type : "text"}
        name={props.name ? props.name : ""}
        value={props.value ? props.value : ""}
        readOnly={props.readOnly ? true : false}
      />
    </div>
  );
};

export default InputWithLabel;
