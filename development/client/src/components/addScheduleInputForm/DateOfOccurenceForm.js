import classes from "./DateOfOccurenceForm.module.css";

import { Calendar } from "react-calendar";
import { formatDate } from "../../utils/Format/Date";

import SearchDropdown from "../UI/Dropdown/SearchDropdown";
import InputWithLabel from "../UI/Input/InputWithLabel";
import { useEffect, useState } from "react";
import DropdownInput from "../UI/Dropdown/DropdownInput";

const loadCalculator = (load, startTime) => {
  const minutes = [45, 90, 150, 195, 300, 345, 405, 450, 510, 555, 615, 660];
  const splittedStartTime = startTime.split(":");
  const minutesTotal =
    splittedStartTime[0] * 60 +
    parseInt(splittedStartTime[1]) +
    minutes[load - 1];
  const pad = (input, hour) => {
    if (hour && input === 24) return "00";
    if (hour && input > 24)
      return input - 24 < 10 ? "0" + (input - 24) : input - 24;
    return input < 10 ? "0" + input : input;
  };
  return `${pad(Math.floor(minutesTotal / 60), "hour")}:${pad(
    Math.floor(minutesTotal % 60)
  )}`;
};

const beginValues = [
  {
    label: "10:00",
    value: "10:00",
  },
  {
    label: "14:15",
    value: "14:15",
  },
  {
    label: "17:30",
    value: "17:30",
  },
  {
    label: "18:00",
    value: "18:00",
  },
];
const endValues = [
  {
    label: "13:15",
    value: "13:15",
  },
  {
    label: "17:30",
    value: "17:30",
  },
  {
    label: "18:00",
    value: "18:00",
  },
  {
    label: "20:00",
    value: "20:00",
  },
];

const lunchValues = [
  {
    label: "JAH",
    value: "JAH",
  },
  {
    label: "EI",
    value: "EI",
  },
];

const DateOfOccurenceForm = (props) => {
  const [dateValue, setDateValue] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [loadValue, setLoadValue] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("");
  const [lunchValue, setLunchValue] = useState("");

  const addDateHandler = (event) => {
    event.preventDefault();
    setShowCalendar((prevState) => (prevState = !prevState));
  };
  const loadChangeHandler = (load) => {
    setLoadValue(load);
  };
  const calendarClickHandler = (event) => {
    setDateValue(event);
    setShowCalendar((prevState) => (prevState = !prevState));
  };
  const startTimeChangeHandler = (value) => {
    if (value.length > 4) {
      let valueArr = value.split(":");
      setStartTime(value);
      props.onChange([
        {
          startTime: `${new Date(
            dateValue.setHours(valueArr[0], valueArr[1], "00", "000")
          ).toISOString()}`,
        },
      ]);
    } else {
      setStartTime(value);
    }
  };
  const endTimeChangeHandler = (value) => {
    if (value.length > 4) {
      let valueArr = value.split(":");
      setEndTime(value);
      props.onChange([
        {
          endTime: `${new Date(
            dateValue.setHours(valueArr[0], valueArr[1], "00", "000")
          ).toISOString()}`,
        },
      ]);
    } else {
      setEndTime(value);
    }
  };

  const lunchChangeHandler = (value) => {
    setLunchValue(value);
  };
  useEffect(() => {
    let valueArr = startTime.split(":");
    props.onChange([
      {
        startTime: `${new Date(
          dateValue.setHours(valueArr[0], valueArr[1], "00", "000")
        ).toISOString()}`,
      },
    ]);
  }, []);

  useEffect(() => {
    if (
      loadValue > 0 &&
      loadValue < 13 &&
      startTime.length === 5 &&
      !endTime.length > 0
    ) {
      setEndTime(loadCalculator(loadValue, startTime));
      let valueArr = loadCalculator(loadValue, startTime).split(":");
      props.onChange([
        {
          endTime: `${new Date(
            dateValue.setHours(valueArr[0], valueArr[1], "00", "000")
          ).toISOString()}`,
        },
      ]);
    }
    if (loadValue > 4) setLunchValue("JAH");
    if (loadValue < 5) setLunchValue("EI");
    if ((loadValue === "" || loadValue > 12) && endTime.length === 0) {
      setEndTime("");
      props.onChange([
        {
          endTime: "",
        },
      ]);
    }
  }, [loadValue, startTime]);

  return (
    <form className={classes.container}>
      <div className={classes.calendar}>
        {showCalendar && (
          <Calendar
            onClickDay={calendarClickHandler}
            value={dateValue}
            className={classes.reactCalendar}
            locale="et-EE"
          />
        )}
        <InputWithLabel
          onClick={addDateHandler}
          type="text"
          name="date"
          label="Kuupäev"
          readOnly={true}
          value={formatDate(dateValue)}
        />
      </div>
      <InputWithLabel
        onChange={loadChangeHandler}
        type="text"
        name="workLoad"
        label="Maht"
        value={loadValue}
      />

      <DropdownInput
        onLoad={startTimeChangeHandler}
        onChange={startTimeChangeHandler}
        options={beginValues}
        value={startTime}
        label="Algus"
        name="startTime"
        cssClass="dropdownOccurence"
      />
      <DropdownInput
        onChange={endTimeChangeHandler}
        options={endValues}
        label="Lõpp"
        cssClass="dropdownOccurence"
        name="endTime"
        value={endTime}
      />
      <DropdownInput
        onChange={lunchChangeHandler}
        options={lunchValues}
        label="Lõuna"
        cssClass="dropdownOccurence"
        name="hasLunch"
        value={lunchValue}
      />
    </form>
  );
};

export default DateOfOccurenceForm;
