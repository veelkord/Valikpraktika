import Modal from "../UI/Modal/Modal";
import NewSubject from "./inputRows/NewSubject";
import classes from "./AddNewItem.module.css";
import { useState } from "react";

const AddNewItem = (props) => {
  const [inputsState, setInputsState] = useState([{}]);
  const [inputsAreValid, setInputsAreValid] = useState({ inputs: false });

  const inputsChangeHandler = (inputsObj, rowIndex, validInputs) => {
    if (rowIndex === 0) {
      setInputsAreValid([{ inputs: validInputs }]);
      setInputsState([inputsObj]);
    }
  };
  const addNewRowHandler = () => {
    setInputsState((prevState) => {
      return (prevState = [...prevState, {}]);
    });
  };
  const removeRowHandler = (index) => {
    setInputsState((prevState) => {
      return [...prevState.filter((e, i) => i !== index)];
    });
  };
  const submitItemHandler = () => {};
  return (
    <Modal onClose={props.onClose}>
      <div className={classes.closeRow}>
        <i className={`bi bi-x`}></i>
      </div>
      {inputsState.map((inputsRow, i) => {
        return (
          <div key={i}>
            <NewSubject
              onAddNewRow={addNewRowHandler}
              onRemoveRow={removeRowHandler}
              modalFor={props.modalFor}
              onChange={inputsChangeHandler}
              index={i}
            />
          </div>
        );
      })}

      <div className={classes.btnRow}>
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
