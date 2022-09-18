import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const work_Data = async () => {
    const response = await axios.get("http://localhost:4000/schedule");

    setData(response.data.schedule);
  };

  const convertDate = (dbDate) => {
    const d = new Date(dbDate);
    return (
      d.toLocaleTimeString() + " " + d.toLocaleDateString().replaceAll("/", "-")
    );
  };

  useEffect(() => {
    work_Data();
  }, []);

  return (
    <div style={{ marginTop: "150px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}></th>
            <th style={{ textAlign: "center" }}>Kursus</th>
            <th style={{ textAlign: "center" }}>Aeg</th>
            <th style={{ textAlign: "center" }}>Õppeaine</th>
            <th style={{ textAlign: "center" }}>Õppejõud</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
