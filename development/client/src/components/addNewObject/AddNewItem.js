import Modal from "../UI/Modal/Modal";
import NewSubject from "./inputRows/NewSubject";
import classes from "./AddNewItem.module.css";
import { useEffect, useState } from "react";
import TooltipTop from "../UI/Tooltip/TooltipTop";
import { formatMilliseconds } from "../../utils/Format/Date";
import axios from "axios";
import NewLecturer from "./inputRows/NewLecturer";

const baseURL = "http://localhost:4000";

const AddNewItem = (props) => {
  const [inputsState, setInputsState] = useState([{}]);
  const [inputsAreValid, setInputsAreValid] = useState([{ inputs: false }]);
  const [validSubmit, setValidSubmit] = useState(true);

  const inputsChangeHandler = (inputsObj, rowIndex, validInputs) => {
    setInputsState((prevState) =>
      prevState.map((obj, i) => {
        if (i === rowIndex) return { ...inputsObj };
        return obj;
      })
    );
    setInputsAreValid((prevState) =>
      prevState.map((obj, i) => {
        if (i === rowIndex) return { inputs: validInputs };
        return obj;
      })
    );
  };
  useEffect(() => {
    if (!validSubmit)
      setValidSubmit(
        inputsAreValid.every((isValid) => isValid.inputs === true)
      );
  }, [inputsAreValid, validSubmit]);
  const addNewRowHandler = () => {
    setInputsState((prevState) => {
      return (prevState = [...prevState, {}]);
    });
    setInputsAreValid((prevState) => {
      return (prevState = [...prevState, {}]);
    });
  };
  const removeRowHandler = (index) => {
    setInputsState((prevState) => {
      return [...prevState.filter((e, i) => i !== index)];
    });
    setInputsAreValid((prevState) => {
      return [...prevState.filter((e, i) => i !== index)];
    });
  };

  const submitItemHandler = () => {
    const isValid = inputsAreValid.every((isValid) => isValid.inputs === true);
    setValidSubmit(isValid);
    if (isValid) {
      console.log(inputsState);
      inputsState.forEach((element) => {
        axios
          .post(`${baseURL}/${props.modalFor}`, { ...element })
          .then((response) =>
            props.onNewItem(
              props.modalFor === "subjects" ? "subjectId" : props.modalFor,
              response.data.id
            )
          );
      });
      setInputsState([{}]);
      setInputsAreValid([{}]);
    }
  };
  return (
    <Modal onClose={props.onClose}>
      <div className={classes.closeRow}>
        <i onClick={props.onClose} className={`bi bi-x`}></i>
      </div>
      {props.modalFor === "subjects" &&
        inputsState.map((inputsRow, i) => {
          return (
            <div key={i}>
              <NewSubject
                onAddNewRow={addNewRowHandler}
                onRemoveRow={removeRowHandler}
                modalFor={props.modalFor}
                onChange={inputsChangeHandler}
                index={i}
                subjectsData={props.subjectsData}
                values={inputsState[i]}
              />
            </div>
          );
        })}
      {props.modalFor === "lecturers" &&
        inputsState.map((inputsRow, i) => {
          return (
            <div key={i}>
              <NewLecturer
                onAddNewRow={addNewRowHandler}
                onRemoveRow={removeRowHandler}
                modalFor={props.modalFor}
                onChange={inputsChangeHandler}
                index={i}
                lecturerData={props.lecturerData}
                values={inputsState[i]}
              />
            </div>
          );
        })}

      <div className={classes.btnRow}>
        {!validSubmit && <TooltipTop errorMessage={"TÄITMATA VÄLJAD"} />}
        <button
          onClick={submitItemHandler}
          className={classes.submitButton}
          type="submit"
        >
          SALVESTA
        </button>
      </div>
    </Modal>
  );
};

export default AddNewItem;
