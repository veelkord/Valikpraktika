import { Fragment, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import classes from "./CalendarInput.module.css";
import * as dateService from "../../../utils/Format/Date";

let now = new Date();

const CalendarInput = (props) => {
  const [startCalendar, setStartCalendar] = useState(new Date());
  const [endCalendar, setEndCalendar] = useState(
    new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
  );
  const [pickStartDate, setPickStartDate] = useState(true);
  const [pickEndDate, setPickEndDate] = useState(false);

  const months = [
    "Jaanuar",
    "Veebruar",
    "Märts",
    "Aprill",
    "Mai",
    "Juuni",
    "Juuli",
    "August",
    "September",
    "Oktoober",
    "November",
    "Detsember",
  ];
  const weekdaysShort = ["P", "E", "T", "K", "N", "R", "L"];

  const startDateHandler = () => {
    setPickStartDate((prevState) => (prevState = !prevState));

    setPickEndDate((prevState) => {
      if (prevState) {
        return (prevState = !prevState);
      }
    });
  };
  const endDateHandler = () => {
    setPickEndDate((prevState) => (prevState = !prevState));
    setPickStartDate((prevState) => {
      if (prevState) {
        return (prevState = !prevState);
      }
    });
  };

  const closeCalendarHandler = () => {
    setStartCalendar(new Date());
    setEndCalendar(
      new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
    );

    setPickStartDate((prevState) => {
      if (prevState) {
        return (prevState = !prevState);
      }
    });
    setPickEndDate((prevState) => {
      if (prevState) {
        return (prevState = !prevState);
      }
    });
  };
  const convertDate = (dbDate) => {
    let d = new Date(dbDate);
    let month = 1 + d.getMonth();
    let day = d.getDate();
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) day = `0${day}`;

    return `${day}.${month}.${d.getFullYear()}`;
  };

  useEffect(() => {
    props.onChange([
      {
        startTime: `${startCalendar}`,
        endTime: `${endCalendar}`,
      },
    ]);
  }, [startCalendar, endCalendar]);

  return (
    <Fragment>
      <div className={classes.calendarInput}>
        {(pickStartDate || pickEndDate) && (
          <i className="bi bi-x-lg" onClick={closeCalendarHandler}></i>
        )}

        <input
          className={classes.startDate}
          type="text"
          name="startDate"
          value={convertDate(startCalendar)}
          readOnly
          onClick={startDateHandler}
        />
        <input
          className={classes.endDate}
          type="text"
          name="endDate"
          value={convertDate(endCalendar)}
          readOnly
          onClick={endDateHandler}
        />
        <div className={classes.verticalStripe} />
      </div>
      {pickStartDate && (
        <Calendar
          onChange={setStartCalendar}
          value={startCalendar}
          formatShortWeekday={(locale, value) => weekdaysShort[value.getDay()]}
          formatMonth={(locale, value) => months[value.getMonth()]}
          formatMonthYear={(locale, value) =>
            `${months[value.getMonth()]}  ${[value.getFullYear()]}`
          }
        />
      )}
      {pickEndDate && (
        <Calendar
          onChange={setEndCalendar}
          value={endCalendar}
          formatShortWeekday={(locale, value) => weekdaysShort[value.getDay()]}
          formatMonth={(locale, value) => months[value.getMonth()]}
          formatMonthYear={(locale, value) =>
            `${months[value.getMonth()]}  ${[value.getFullYear()]}`
          }
        />
      )}
    </Fragment>
  );
};

export default CalendarInput;
