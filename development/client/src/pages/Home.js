import React, { useState, useEffect, useCallback, Fragment } from "react";
import classes from "./Home.module.css";
import useAxios from "../hooks/useAxios";

import ScheduleFilters from "../components/searchFilters/ScheduleFilters";
import Table from "../components/UI/Table/Table";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { response, loading, error } = useAxios({
    method: "get",
    url: "/schedule",
  });

  const [dropdownsSelection, setDropdownSelection] = useState([]);
  const [admin, setAdmin] = useState(false);

  const work_Data = useCallback(() => {
    if (!loading && response !== undefined) {
      let schedule = response.schedule;
      schedule.forEach(function (o) {
        Object.keys(o).forEach(function (k) {
          if (o[k] === null) {
            o[k] = "";
          }
        });
      });
      setData(schedule);
      setFilteredData(schedule);
    }
  }, [loading, response]);

  const convertDate = (dbDate) => {
    const d = new Date(dbDate);
    const days = [
      "Pühapäev",
      "Esmaspäev",
      "Teisipäev",
      "Kolmapäev",
      "Neljapäev",
      "Reede",
      "Laupäev",
    ];
    return d.toDateString();
  };

  useEffect(() => {
    work_Data();
  }, [work_Data]);

  const dropdownController = (data, obj) => {
    let obje = data.filter((e) => e[obj.flatMap(Object.keys)[0]] === undefined);
    if (
      obj[0].value === "course" ||
      obj[0].value === "subject" ||
      obj[0].value === "lecturer" ||
      obj[0].value === "room"
    ) {
      return [...data.filter((e) => e[obj[0].value] === undefined)];
    }

    return [...obj, ...obje];
  };

  const scheduleFilter = (filterObj, rawData, filterType) => {
    let filteredObjects = filterObj.filter((e) => e[filterType]);
    let objectKeys = filteredObjects.flatMap(Object.keys);
    let objectValues = filteredObjects.flatMap(Object.values);
    let filteredeData = [];
    if (filterType !== "startTime" || filterType !== "endTime") {
      for (let i = 0; i < objectValues.length; i++) {
        filteredeData.push(
          ...rawData.filter((e) => e[objectKeys[i]].includes(objectValues[i]))
        );
      }
    }

    if (filterType === "startTime") {
      filteredeData.push(
        ...rawData.filter((e) => {
          let time1 = new Date(e[objectKeys[0]]).getTime();
          let time2 = new Date(objectValues[0]).getTime();
          let time3 = new Date(objectValues[1]).getTime();
          return time1 >= time2 && time1 <= time3;
        })
      );
    }

    filteredeData = filteredeData.filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );
    return filteredeData;
  };

  const dataFilterHandler = (dropdownValues) => {
    setDropdownSelection((prevState) => {
      return [...dropdownController(prevState, dropdownValues)];
    });
  };

  useEffect(() => {
    const hasStartTime = dropdownsSelection.find((o) => o.startTime);
    const hasEndTime = dropdownsSelection.find((o) => o.endTime);
    const hasCourse = dropdownsSelection.find((o) => o.course);
    const hasSubject = dropdownsSelection.find((o) => o.subject);
    const hasLecturer = dropdownsSelection.find((o) => o.lecturer);
    const hasRoom = dropdownsSelection.find((o) => o.room);

    if (hasCourse) {
      setFilteredData([...scheduleFilter(dropdownsSelection, data, "course")]);
    }
    if (hasSubject) {
      setFilteredData((prevState) => {
        return [
          ...scheduleFilter(
            dropdownsSelection,
            hasCourse ? prevState : data,
            "subject"
          ),
        ];
      });
    }
    if (hasLecturer) {
      setFilteredData((prevState) => {
        return [
          ...scheduleFilter(
            dropdownsSelection,
            hasCourse || hasSubject ? prevState : data,
            "lecturer"
          ),
        ];
      });
    }
    if (hasRoom) {
      setFilteredData((prevState) => {
        return [
          ...scheduleFilter(
            dropdownsSelection,
            hasCourse || hasLecturer || hasSubject ? prevState : data,
            "room"
          ),
        ];
      });
    }
    if (hasStartTime) {
      setFilteredData((prevState) => {
        return [
          ...scheduleFilter(
            dropdownsSelection,
            hasCourse || hasLecturer || hasSubject || hasRoom
              ? prevState
              : data,
            "startTime"
          ),
        ];
      });
    }
    // if (hasEndTime) {
    //   setFilteredData((prevState) => {
    //     return [
    //       ...scheduleFilter(
    //         dropdownsSelection,
    //         hasCourse || hasLecturer || hasSubject || hasRoom || hasStartTime
    //           ? prevState
    //           : data,
    //         "endTime"
    //       ),
    //     ];
    //   });
    // }
    if (dropdownsSelection.length === 0) {
      setFilteredData([...data]);
    }
  }, [data, dropdownsSelection]);

  filteredData.sort(
    (objA, objB) =>
      Number(new Date(objA.startTime)) - Number(new Date(objB.startTime))
  );
  const convertDay = (dbDate) => {
    let d = new Date(dbDate);
    const days = [
      "Pühapäev",
      "Esmaspäev",
      "Teisipäev",
      "Kolmapäev",
      "Neljapäev",
      "Reede",
      "Laupäev",
    ];

    return days[d.getDay()];
  };
  const getDate = (dbDate) => {
    let d = new Date(dbDate);
    let month = 1 + d.getMonth();
    if (month < 10) {
      month = `0${month}`;
    }
    return `${d.getDate()}.${month}.${d.getFullYear()}`;
  };
  const userRollHandler = () => {
    setAdmin((prevState) => (prevState = !prevState));
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.scheduleFilters}>
          {admin && (
            <button className={classes.addBtn} type="button">
              LISA
            </button>
          )}
          <ScheduleFilters onPassingFilters={dataFilterHandler} />
        </div>

        <div className={classes.schedule}>
          {admin && (
            <div className={classes.newScheduleItemModal}>
              <div>LISAMINE...Coming Sooooooon</div>
              <div>Starring: Comic Sans</div>
            </div>
          )}
          {[
            ...new Set(filteredData.map((e) => e.startTime.substring(0, 10))),
          ].map((e, i) => {
            return (
              <div key={i}>
                <div className={classes.scheduleDays}>
                  <div className={classes.scheduleDay}>{convertDay(e)}</div>
                  <div className={classes.scheduleDate}>{getDate(e)}</div>
                </div>
                <Table day={e} filteredData={filteredData} rawData={data} />
              </div>
            );
          })}
        </div>
        <div className={classes.leftSide}>
          <button
            onClick={userRollHandler}
            className={classes.adminBtn}
            type="button"
          >
            Salanupp
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
