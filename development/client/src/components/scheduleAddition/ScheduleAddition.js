import { useState, useEffect, useCallback } from "react";
import useAxios from "../../hooks/useAxios";
import DateOfOccurenceForm from "../addScheduleInputForm/DateOfOccurenceForm";
import AddDropdown from "../UI/Dropdown/AddDropdown";
import classes from "./ScheduleAddition.module.css";
import axios from "axios";
import AddNewItem from "../addNewObject/AddNewItem";

const baseURL = "http://localhost:4000";

const ScheduleAddition = (props) => {
  const [courseData, setCourseData] = useState([]);
  const [lecturerData, setLecturerData] = useState([]);
  const [roomsData, setRoomsData] = useState([]);
  const [subjectsData, setSubjectsData] = useState([]);
  const [newOccurence, setNewOccurence] = useState([
    {
      startTime: "",
      endTime: "",
    },
  ]);
  const [addedLecture, setAddedLecture] = useState([
    {
      comment: "",
      rooms: "",
      courses: "",
      subjectId: null,
      lecturers: "",
      distanceLink: "",
    },
  ]);
  const [newDropdownItem, setNewDropdownItem] = useState(false);

  const {
    response: courseResponse,
    isLoading: courseLoading,
    error: courseError,
  } = useAxios({ method: "get", url: "/courses" }, newDropdownItem);
  const {
    response: lecturerResponse,
    isLoading: lecturerLoading,
    error: lecturerError,
  } = useAxios({ method: "get", url: "/lecturers" }, newDropdownItem);
  const {
    response: roomResponse,
    isLoading: roomLoading,
    error: roomError,
  } = useAxios({ method: "get", url: "/rooms" }, newDropdownItem);
  const {
    response: subjectsResponse,
    isLoading: subjectsLoading,
    error: subjectsError,
  } = useAxios({ method: "get", url: "/subjects" }, newDropdownItem);

  const [subjectValid, setSubjectValid] = useState(false);
  const [occurenesIsValid, setOccurencesIsValid] = useState([]);

  const [clearOccurenceFields, setClearOccurenceFields] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const workCourseData = useCallback(() => {
    if (!courseLoading && courseResponse !== undefined) {
      const courses = [{ label: "Lisa uus...", value: "newCourse" }];

      for (const key in courseResponse.courses) {
        courses.push({
          label: courseResponse.courses[key].courseCode,
          value: courseResponse.courses[key].id,
        });
      }
      setCourseData(courses);
    }
  }, [courseLoading, courseResponse]);

  const workLecturerData = useCallback(() => {
    if (!lecturerLoading && lecturerResponse !== undefined) {
      const lecturers = [{ label: "Lisa uus...", value: "newLecturer" }];

      for (const key in lecturerResponse.lecturers) {
        lecturers.push({
          label:
            lecturerResponse.lecturers[key].firstName +
            " " +
            lecturerResponse.lecturers[key].lastName,
          value: lecturerResponse.lecturers[key].id,
        });
      }
      setLecturerData(lecturers);
    }
  }, [lecturerLoading, lecturerResponse]);

  const workRoomsData = useCallback(() => {
    if (!roomLoading && roomResponse !== undefined) {
      const rooms = [{ label: "Lisa uus...", value: "newRoom" }];

      for (const key in roomResponse.rooms) {
        rooms.push({
          label: roomResponse.rooms[key].room,
          value: roomResponse.rooms[key].id,
        });
      }
      setRoomsData(rooms);
    }
  }, [roomLoading, roomResponse]);

  const workSubjectsData = useCallback(() => {
    if (!subjectsLoading && subjectsResponse !== undefined) {
      const subjects = [{ label: "Lisa uus...", value: "newSubject" }];

      for (const key in subjectsResponse.subjects) {
        subjects.push({
          label: subjectsResponse.subjects[key].subject,
          value: subjectsResponse.subjects[key].id,
        });
      }
      setSubjectsData(subjects);
    }
  }, [subjectsLoading, subjectsResponse]);

  useEffect(() => {
    workCourseData();
  }, [workCourseData, courseResponse]);
  useEffect(() => {
    workLecturerData();
  }, [workLecturerData, lecturerResponse]);
  useEffect(() => {
    workRoomsData();
  }, [workRoomsData, roomResponse]);
  useEffect(() => {
    workSubjectsData();
  }, [workSubjectsData, subjectsResponse]);

  const dropdownHandler = (dropDownValue) => {
    console.log(dropDownValue);
    if (dropDownValue[0].subjectId === "newSubject") {
      setShowAddModal(true);
      setModalContent("subjects");
      return;
    }
    if (dropDownValue[0].lecturerId === "newLecturer") {
      setShowAddModal(true);
      setModalContent("lecturers");
      return;
    }
    if (dropDownValue[0].courseId === "newCourse") {
      setShowAddModal(true);
      setModalContent("courses");
      return;
    }
    if (dropDownValue[0].roomId === "newRoom") {
      setShowAddModal(true);
      setModalContent("rooms");
      return;
    }
    if (dropDownValue[0].subjectId) setSubjectValid(false);
    setAddedLecture((prevState) => {
      const dropdown = Object.keys(dropDownValue[0])[0];
      return [
        {
          rooms: dropdown === "roomId" ? dropDownValue : prevState[0].rooms,
          courses:
            dropdown === "courseId" ? dropDownValue : prevState[0].courses,
          subjectId:
            dropdown === "subjectId"
              ? dropDownValue[0].subjectId
              : prevState[0].subjectId,
          lecturers:
            dropdown === "lecturerId" ? dropDownValue : prevState[0].lecturers,
          comment: prevState[0].comment,
          distanceLink: prevState[0].distanceLink,
        },
      ];
    });
  };

  const occurenceHandler = (occurence, index) => {
    if (clearOccurenceFields) setClearOccurenceFields(false);
    if (occurence[0].subjectId) setSubjectValid(false);
    setNewOccurence((prevState) => {
      const dropdown = Object.keys(occurence[0])[0];
      let newArr = [...prevState];
      newArr[index] = {
        startTime:
          dropdown === "startTime"
            ? occurence[0].startTime
            : prevState[index].startTime,
        endTime:
          dropdown === "endTime"
            ? occurence[0].endTime
            : prevState[index].endTime,
      };
      return newArr;
    });
  };

  const validateOccurences = (occurenceArray) => {
    let validated = [];
    occurenceArray.forEach((element, i, self) => {
      let newObj = { index: i, endTime: true, date: true };
      if (!(element.endTime !== "")) {
        newObj.endTime = false;
      }
      if (self.filter((e) => e.startTime === element.startTime).length > 1) {
        newObj.date = false;
      }
      validated.push(newObj);
    });
    return validated;
  };

  const valitationFailed = (objArr) => {
    for (let i = 0; i < objArr.length; i++) {
      if (objArr[i].endTime !== true && objArr[i].date !== true) {
        console.log("jup");
        return true;
      }
    }
    return false;
  };

  const submitScheduleHandler = () => {
    const hasSubject =
      addedLecture[0].subjectId !== null || addedLecture[0].subjectId !== "";
    const occurenceValidator = validateOccurences(newOccurence);
    console.log(occurenceValidator);
    console.log(!valitationFailed(occurenceValidator));
    if (!valitationFailed(occurenceValidator) && hasSubject) {
      newOccurence.forEach(async (element) => {
        await axios.post(`${baseURL}/schedule`, {
          ...addedLecture[0],
          ...element,
        });
      });
      setNewOccurence([
        {
          startTime: "",
          endTime: "",
        },
      ]);
      setOccurencesIsValid([]);
      setClearOccurenceFields(true);
      setAddedLecture([
        {
          comment: "",
          rooms: "",
          courses: "",
          subjectId: "",
          lecturers: "",
          distanceLink: "",
        },
      ]);
      props.onNewOccurence();
    } else {
      setOccurencesIsValid(occurenceValidator);
      setSubjectValid(!hasSubject);
    }
  };
  const newRowHandler = () => {
    setNewOccurence((prevState) => {
      return (prevState = [...prevState, { startTime: "", endTime: "" }]);
    });
  };
  const deleteRowHandler = (index) => {
    setNewOccurence((prevState) => {
      return [...prevState.filter((e, i) => i !== index)];
    });
    setOccurencesIsValid((prevState) => {
      return [...prevState.filter((e, i) => i !== index)];
    });
  };

  useEffect(() => {
    console.log(newOccurence);
    console.log(addedLecture);
  }, [newOccurence, addedLecture]);

  const closeModalHandler = (dropdownToReset) => {
    setShowAddModal(false);
    if (dropdownToReset) {
      setAddedLecture((prevState) =>
        prevState.map((obj) => {
          return {
            ...obj,
            [dropdownToReset]: "",
          };
        })
      );
    }
  };

  const newItemhandler = (itemName, hasNewItem) => {
    setNewDropdownItem((prevState) => (prevState = !prevState));
    setAddedLecture((prevState) =>
      prevState.map((obj) => {
        return {
          ...obj,
          [itemName]: hasNewItem,
        };
      })
    );
  };
  return (
    <div className={classes.newScheduleItemModal}>
      {showAddModal && (
        <AddNewItem
          onClose={closeModalHandler}
          subjectsData={subjectsResponse}
          lecturerData={lecturerResponse}
          courseData={courseResponse}
          roomsData={roomResponse}
          modalFor={modalContent}
          onNewItem={newItemhandler}
        />
      )}
      <h6>LOENGU LISAMINE TUNNIPLAANI</h6>
      <div className={classes.dropdownsRow}>
        <AddDropdown
          onChange={dropdownHandler}
          cssClass="dropdownAddition"
          options={subjectsData}
          label="Õppeaine"
          name="subject"
          hasError={subjectValid}
          value={addedLecture[0].subjectId}
        />
        <AddDropdown
          onChange={dropdownHandler}
          cssClass="dropdownAddition"
          options={lecturerData}
          label="Õppejõud"
          name="lecturer"
          isMulti={true}
          value={addedLecture[0].lecturers}
        />
        <AddDropdown
          onChange={dropdownHandler}
          cssClass="dropdownAddition"
          options={courseData}
          label="Kursus"
          name="course"
          isMulti={true}
          value={addedLecture[0].courses}
        />
        <AddDropdown
          onChange={dropdownHandler}
          cssClass="dropdownAddition"
          options={roomsData}
          label="Ruum"
          name="room"
          isMulti={true}
          value={addedLecture[0].rooms}
        />
      </div>
      {newOccurence.map((occurence, i) => {
        return (
          <div key={i} className={classes.occurenceRow}>
            <DateOfOccurenceForm
              onChange={occurenceHandler}
              onNewOccurence={[occurence]}
              index={i}
              onClick={newRowHandler}
              onDelete={deleteRowHandler}
              onNotValidFields={occurenesIsValid}
              onAfterSubmit={clearOccurenceFields}
            />
          </div>
        );
      })}

      <div className={classes.buttonRow}>
        <button
          onClick={submitScheduleHandler}
          className={classes.submitButton}
          type="submit"
        >
          SALVESTA
        </button>
      </div>
    </div>
  );
};

export default ScheduleAddition;
