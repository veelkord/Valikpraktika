import { useEffect } from "react";
import { useState } from "react";
import InputWithPlaceholder from "../../UI/Input/InputWithPlaceholder";
import classes from "./NewSubject.module.css";

const NewSubject = (props) => {
  const { onChange, index } = props;
  const [enteredSubjectData, setEnteredSubjectData] = useState({
    subject: "",
    subjectCode: "",
    subjectPoints: "",
  });
  const [isSubjectValid, setIsSubjectValid] = useState(true);
  const [isSubjectCodeValid, setIsSubjectCodeValid] = useState(true);
  const [isSubjectPointsValid, setIsSubjectPointsValid] = useState(true);
  const [isValid, setIsValid] = useState(false);

  const inputChangeHandler = (value) => {
    const isSubject = value.name === "subject";
    const isSubjectCode = value.name === "subjectCode";
    const isSubjectPoints = value.name === "subjectPoints";
    const hasValue = value.value !== "";
    if (isSubject) {
      !hasValue ? setIsSubjectValid(false) : setIsSubjectValid(true);
      setEnteredSubjectData((prevState) => {
        return { ...prevState, subject: value.value };
      });
    }

    if (isSubjectCode) {
      !hasValue ? setIsSubjectCodeValid(false) : setIsSubjectCodeValid(true);
      setEnteredSubjectData((prevState) => {
        return { ...prevState, subjectCode: value.value };
      });
    }

    if (isSubjectPoints) {
      !value.value.match(/^([1-9][0-9]{0,1})$/)
        ? setIsSubjectPointsValid(false)
        : setIsSubjectPointsValid(true);
      setEnteredSubjectData((prevState) => {
        return { ...prevState, subjectPoints: value.value };
      });
    }
  };

  const removeRowHandler = () => {
    props.onRemoveRow(index);
  };
  useEffect(() => {
    if (isSubjectValid && isSubjectCodeValid && isSubjectPointsValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isSubjectCodeValid, isSubjectPointsValid, isSubjectValid]);

  useEffect(() => {
    onChange(enteredSubjectData, index, isValid);
  }, [enteredSubjectData, isValid]);
  return (
    <div className={classes.container}>
      {index === 0 && (
        <h1 className={classes.caption}>UUE ÕPPEAINE LISAMINE</h1>
      )}
      <div className={classes.inputRow}>
        <InputWithPlaceholder
          placeholder="Õppeaine"
          onChange={inputChangeHandler}
          name={"subject"}
          value={enteredSubjectData.subject}
          hasError={isSubjectValid}
        />
        <InputWithPlaceholder
          placeholder="Ainekood"
          onChange={inputChangeHandler}
          name={"subjectCode"}
          value={enteredSubjectData.subjectCode}
          hasError={isSubjectCodeValid}
        />
        <InputWithPlaceholder
          placeholder="EAP"
          onChange={inputChangeHandler}
          name={"subjectPoints"}
          value={enteredSubjectData.subjectPoints}
          hasError={isSubjectPointsValid}
        />
        {index === 0 && (
          <i
            onClick={props.onAddNewRow}
            className={`${classes.plusIcon} bi bi-plus`}
          ></i>
        )}
        {index > 0 && (
          <i
            onClick={removeRowHandler}
            className={`${classes.plusIcon} bi bi-x`}
          ></i>
        )}
      </div>
    </div>
  );
};

export default NewSubject;
