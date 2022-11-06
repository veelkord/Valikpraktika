import { useEffect } from "react";
import { useState } from "react";
import InputWithPlaceholder from "../../UI/Input/InputWithPlaceholder";
import classes from "./NewLecturer.module.css";

const NewLecturer = (props) => {
  const { onChange, index } = props;
  const [enteredLecturerData, setEnteredLecturerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [errorMessage, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const inputChangeHandler = (value) => {
    const isFirstName = value.name === "firstName";
    const isLastName = value.name === "lastName";
    const isEmail = value.name === "email";
    const hasValue = value.value !== "";
    if (isFirstName) {
      !hasValue
        ? setErrorMessages((prevState) => {
            return {
              ...prevState,
              firstName: "KOHUSTUSLIK",
            };
          })
        : setErrorMessages((prevState) => {
            return { ...prevState, firstName: null };
          });
      setEnteredLecturerData((prevState) => {
        return { ...prevState, firstName: value.value };
      });
    }
    if (isLastName) {
      !hasValue
        ? setErrorMessages((prevState) => {
            return {
              ...prevState,
              lastName: "KOHUSTUSLIK",
            };
          })
        : setErrorMessages((prevState) => {
            return { ...prevState, lastName: null };
          });
      setEnteredLecturerData((prevState) => {
        return { ...prevState, lastName: value.value };
      });
    }

    if (isEmail) {
      console.log(props.lecturerData.lecturers);
      const emailExists =
        props.lecturerData.lecturers.filter((e) => e.email === value.value)
          .length > 0;
      emailExists || !hasValue
        ? setErrorMessages((prevState) => {
            return {
              ...prevState,
              email: emailExists ? "ÕPPEJÕUD OLEMAS" : "KOHUSTUSLIK",
            };
          })
        : setErrorMessages((prevState) => {
            return { ...prevState, email: null };
          });
      setEnteredLecturerData((prevState) => {
        return { ...prevState, email: value.value };
      });
    }
  };

  const removeRowHandler = () => {
    props.onRemoveRow(index);
  };

  useEffect(() => {
    if (
      errorMessage.firstName === null &&
      errorMessage.lastName === null &&
      errorMessage.email === null
    ) {
      onChange(enteredLecturerData, index, true);
      return;
    }
    onChange(enteredLecturerData, index, false);
  }, [enteredLecturerData, errorMessage]);
  return (
    <div className={classes.container}>
      {index === 0 && <h1 className={classes.caption}>UUE ÕPPEJÕU LISAMINE</h1>}
      <div className={classes.inputRow}>
        <InputWithPlaceholder
          placeholder="Eesnimi"
          onChange={inputChangeHandler}
          name={"firstName"}
          value={props.values.firstName}
          errorMessage={errorMessage.firstName}
        />
        <InputWithPlaceholder
          placeholder="Perenimi"
          onChange={inputChangeHandler}
          name={"lastName"}
          value={props.values.lastName}
          errorMessage={errorMessage.lastName}
        />
        <InputWithPlaceholder
          placeholder="Email"
          onChange={inputChangeHandler}
          name={"email"}
          value={props.values.email}
          errorMessage={errorMessage.email}
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

export default NewLecturer;
