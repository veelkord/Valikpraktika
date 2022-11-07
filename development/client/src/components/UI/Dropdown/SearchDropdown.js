import Select from "react-select";
import classes from "./SearchDropdown.module.css";

const SearchDropdown = (props) => {
  const changeHandler = (choice) => {
    let newArrayOfObj;
    if (props.isMulti) {
      newArrayOfObj = choice.map(({ value }) => ({
        [props.name]: value.trim(),
      }));
    }
    if (!props.isMulti) {
      newArrayOfObj = [choice].map(({ value }) => ({
        [props.name]: value.trim(),
      }));
    }

    if (newArrayOfObj.length > 0) {
      props.onChange(newArrayOfObj);
    } else {
      props.onChange([{ value: props.name }]);
    }
  };

  const inputChangeHandler = (e) => {
    if (props.onInputChange) {
      props.onInputChange(e);
    }
  };

  return (
    <div
      className={
        props.cssClass ? classes[props.cssClass] : classes.dropdownFilters
      }
    >
      {props.topLabel && <label>{props.topLabel}</label>}
      <Select
        placeholder={props.label}
        options={props.options}
        onChange={changeHandler}
        isMulti={props.isMulti ? true : false}
        onInputChange={inputChangeHandler}
        noOptionsMessage={(value) => (value = "")}
      />
    </div>
  );
};

export default SearchDropdown;
