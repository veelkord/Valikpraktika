import { Fragment, useCallback, useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import SearchDropdown from "../UI/SearchDropdown";
import classes from "./ScheduleFilters.module.css";
import Calendar from "react-calendar";
import "../UI/Calendar/Calendar.css";

const ScheduleFilters = (props) => {
  const [courseData, setCourseData] = useState([]);
  const [lecturerData, setLecturerData] = useState([]);
  const [roomsData, setRoomsData] = useState([]);
  const [subjectsData, setSubjectsData] = useState([]);

  const [value, onChange] = useState(new Date());

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
      const courses = [];

      for (const key in courseResponse.courses) {
        courses.push({
          label: courseResponse.courses[key].course,
          value: courseResponse.courses[key].course,
        });
      }
      setCourseData(courses);
    }
  }, [courseLoading, courseResponse]);

  const workLecturerData = useCallback(() => {
    if (!lecturerLoading && lecturerResponse !== undefined) {
      const lecturers = [];

      for (const key in lecturerResponse.lecturers) {
        lecturers.push({
          label:
            lecturerResponse.lecturers[key].firstName +
            " " +
            lecturerResponse.lecturers[key].lastName,
          value:
            lecturerResponse.lecturers[key].firstName +
            " " +
            lecturerResponse.lecturers[key].lastName,
        });
      }
      setLecturerData(lecturers);
    }
  }, [lecturerLoading, lecturerResponse]);

  const workRoomsData = useCallback(() => {
    if (!roomLoading && roomResponse !== undefined) {
      const rooms = [];

      for (const key in roomResponse.rooms) {
        rooms.push({
          label: roomResponse.rooms[key].room,
          value: roomResponse.rooms[key].room,
        });
      }
      setRoomsData(rooms);
    }
  }, [roomLoading, roomResponse]);

  const workSubjectsData = useCallback(() => {
    if (!subjectsLoading && subjectsResponse !== undefined) {
      const subjects = [];

      for (const key in subjectsResponse.subjects) {
        subjects.push({
          label: subjectsResponse.subjects[key].subject,
          value: subjectsResponse.subjects[key].subject,
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

  const filtersHandler = (filterObj) => {
    props.onPassingFilters(filterObj);
  };
  const formatMonthNames = (locale, value) => {
    const months = [
      "Jaanuar",
      "Veebruar",
      "Märts",
      "Aprill",
      "Mai",
      "Juuni",
      "Juuli",
      "August",
      "Oktoober",
      "November",
      "Detsember",
    ];
    return months[value.getMonth()];
  };
  const months = [
    "Jaanuar",
    "Veebruar",
    "Märts",
    "Aprill",
    "Mai",
    "Juuni",
    "Juuli",
    "August",
    "Oktoober",
    "November",
    "Detsember",
  ];
  const weekdaysShort = ["P", "E", "T", "K", "N", "R", "L"];

  return (
    <div className={classes.scheduleFilters}>
      <Calendar
        onChange={onChange}
        value={value}
        formatShortWeekday={(locale, value) => weekdaysShort[value.getDay()]}
        formatMonth={(locale, value) => months[value.getMonth()]}
        formatMonthYear={(locale, value) =>
          `${months[value.getMonth()]}  ${[value.getFullYear()]}`
        }
      />
      <SearchDropdown
        onChange={filtersHandler}
        options={courseData}
        label="Kursus"
        name="course"
      />
      <SearchDropdown
        onChange={filtersHandler}
        options={subjectsData}
        label="Õppeaine"
        name="subject"
      />
      <SearchDropdown
        onChange={filtersHandler}
        options={lecturerData}
        label="Õppejõud"
        name="lecturer"
      />
      <SearchDropdown
        onChange={filtersHandler}
        options={roomsData}
        label="Ruum"
        name="room"
      />
    </div>
  );
};

export default ScheduleFilters;
