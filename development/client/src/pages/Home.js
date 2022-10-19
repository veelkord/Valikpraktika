import React, { useState, useEffect, useCallback, Fragment } from "react";
import classes from "./Home.module.css";
import useAxios from "../hooks/useAxios";

import ScheduleFilters from "../components/searchFilters/ScheduleFilters";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { response, loading, error } = useAxios({
    method: "get",
    url: "/schedule",
  });

  const [dropdownsSelection, setDropdownSelection] = useState([]);

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

    for (let i = 0; i < objectValues.length; i++) {
      filteredeData.push(
        ...rawData.filter((e) => e[objectKeys[i]].includes(objectValues[i]))
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
    if (dropdownsSelection.length === 0) {
      setFilteredData([...data]);
    }
  }, [data, dropdownsSelection]);

  return (
    <Fragment>
      <div className={classes.container}>
        <ScheduleFilters onPassingFilters={dataFilterHandler} />
        {error && <p>`Error: ${error}`</p>}
        {!loading && (
          <table className="styled-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}></th>
                <th style={{ textAlign: "center" }}>Kursus</th>
                <th style={{ textAlign: "center" }}>Aeg</th>
                <th style={{ textAlign: "center" }}>Õppeaine</th>
                <th style={{ textAlign: "center" }}>Õppejõud</th>
                <th style={{ textAlign: "center" }}>Ruum</th>
                <th style={{ textAlign: "center" }}>Info</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.course}</td>
                    <td>
                      {convertDate(item.startTime) +
                        " " +
                        convertDate(item.endTime)}
                    </td>
                    <td>{item.subject + " " + item.subjectCode}</td>
                    <td>{item.lecturer}</td>
                    <td>{item.room || "-"}</td>
                    <td>{item.comment || "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <div></div>
      </div>
    </Fragment>
  );
};

export default Home;
