import { Fragment, useState } from "react";
import classes from "./TableRow.module.css";
import TableSubjectInfo from "./TableSubjectInfo";
import { formatHoursMinutes } from "../../../utils/Format/Date";

const TableBody = (props) => {
  const [showInfo, setShowInfo] = useState(false);

  const extraInfoHandler = () => {
    setShowInfo((prevState) => (prevState = !prevState));
  };
  return (
    <Fragment>
      <tr className={classes.tableHead} key={props.id}>
        <td>
          {formatHoursMinutes(props.item.startTime).toString() +
            "-" +
            formatHoursMinutes(props.item.endTime).toString()}
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
          rawData={props.rawData}
        />
      )}
    </Fragment>
  );
};

export default TableBody;
