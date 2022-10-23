import { Fragment, useState } from "react";
import classes from "./TableRow.module.css";
import TableSubjectInfo from "./TableSubjectInfo";

const TableBody = (props) => {
  const [showInfo, setShowInfo] = useState(false);
  const convertTime = (dbDate) => {
    let d = new Date(dbDate);
    let hour = d.getHours() - 3;
    let minutes = d.getMinutes();
    if (hour < 10) hour = `0${hour}`;
    if (minutes < 10) minutes = `0${minutes}`;

    return `${hour}:${minutes}`;
  };
  const extraInfoHandler = () => {
    setShowInfo((prevState) => (prevState = !prevState));
  };
  return (
    <Fragment>
      <tr className={classes.tableHead} key={props.id}>
        <td>
          {convertTime(props.item.startTime) +
            "-" +
            convertTime(props.item.endTime)}
        </td>
        <td onClick={extraInfoHandler}>{props.item.subject}</td>
        <td>{props.item.lecturer}</td>
        <td>{props.item.room || "-"}</td>
        {/* <td>{props.item.comment || "-"}</td> */}
      </tr>
      {showInfo && (
        <TableSubjectInfo
          onClick={extraInfoHandler}
          item={props.item}
          data={props.data}
        />
      )}
    </Fragment>
  );
};

export default TableBody;
