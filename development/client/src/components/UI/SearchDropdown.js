import Select from "react-select";
import classes from "./SearchDropdown.module.css";

const SearchDropdown = (props) => {
  const changeHandler = (choice) => {
    const newArrayOfObj = choice.map(({ value }) => ({
      [props.name]: value,
    }));
    if (choice.length > 0) {
      props.onChange(newArrayOfObj);
    } else {
      props.onChange([{ value: props.name }]);
    }
  };
  return (
    <div className={classes.dropdown}>
      <Select
        placeholder={props.label}
        options={props.options}
        onChange={changeHandler}
        isMulti="true"
      />
    </div>
  );
};

export default SearchDropdown;
