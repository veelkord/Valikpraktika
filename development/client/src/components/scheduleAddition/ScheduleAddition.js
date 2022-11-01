import { useState, useEffect, useCallback } from "react";
import useAxios from "../../hooks/useAxios";
import DateOfOccurenceForm from "../addScheduleInputForm/DateOfOccurenceForm";
import AddDropdown from "../UI/Dropdown/AddDropdown";
import classes from "./ScheduleAddition.module.css";

const ScheduleAddition = (props) => {
  const [courseData, setCourseData] = useState([]);
  const [lecturerData, setLecturerData] = useState([]);
  const [roomsData, setRoomsData] = useState([]);
  const [subjectsData, setSubjectsData] = useState([]);
  const [newOccurence, setNewOccurence] = useState([
    {
      startTime: "",
      endTime: "",
      comment: "",
      room: "",
      course: "",
      subject: "",
      lecturer: "",
    },
  ]);

  const {
    response: courseResponse,
    isLoading: courseLoading,
    error: courseError,
  } = useAxios({ method: "get", url: "/courses" });
  const {
    response: lecturerResponse,
    isLoading: lecturerLoading,
    error: lecturerError,
  } = useAxios({ method: "get", url: "/lecturers" });
  const {
    response: roomResponse,
    isLoading: roomLoading,
    error: roomError,
  } = useAxios({ method: "get", url: "/rooms" });
  const {
    response: subjectsResponse,
    isLoading: subjectsLoading,
    error: subjectsError,
  } = useAxios({ method: "get", url: "/subjects" });

  const workCourseData = useCallback(() => {
    if (!courseLoading && courseResponse !== undefined) {
      const courses = [{ label: "Lisa uus...", value: "newCourse" }];

      for (const key in courseResponse.courses) {
        courses.push({
          label: courseResponse.courses[key].course,
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
    setNewOccurence((prevState) => {
      const dropdown = Object.keys(dropDownValue[0])[0];
      return [
        {
          startTime:
            dropdown === "startTime"
              ? dropDownValue[0].startTime
              : prevState[0].startTime,
          endTime:
            dropdown === "endTime"
              ? dropDownValue[0].endTime
              : prevState[0].endTime,
          room: dropdown === "roomId" ? dropDownValue : prevState[0].room,
          course: dropdown === "courseId" ? dropDownValue : prevState[0].course,
          subject:
            dropdown === "subjectId" ? dropDownValue : prevState[0].subject,
          lecturer:
            dropdown === "lecturerId" ? dropDownValue : prevState[0].lecturer,
        },
      ];
    });
  };

  useEffect(() => {
    console.log(newOccurence);
  }, [newOccurence]);

  const submitScheduleHandler = () => {};

  return (
    <div className={classes.newScheduleItemModal}>
      <h6>LOENGU LISAMINE TUNNIPLAANI</h6>
      <div className={classes.dropdownsRow}>
        <AddDropdown
          onChange={dropdownHandler}
          cssClass="dropdownAddition"
          options={subjectsData}
          label="Õppeaine"
          name="subject"
        />
        <AddDropdown
          onChange={dropdownHandler}
          cssClass="dropdownAddition"
          options={lecturerData}
          label="Õppejõud"
          name="lecturer"
          isMulti={true}
        />
        <AddDropdown
          onChange={dropdownHandler}
          cssClass="dropdownAddition"
          options={courseData}
          label="Kursus"
          name="course"
          isMulti={true}
        />
        <AddDropdown
          onChange={dropdownHandler}
          cssClass="dropdownAddition"
          options={roomsData}
          label="Ruum"
          name="room"
          isMulti={true}
        />
      </div>
      <div className={classes.occurenceRow}>
        <DateOfOccurenceForm
          onChange={dropdownHandler}
          onNewOccurence={newOccurence[0]}
        />
      </div>

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
