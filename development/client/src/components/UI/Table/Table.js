import TableRow from "./TableRow";
import classes from "./Table.module.css";
import { Fragment, useState } from "react";

const Table = (props) => {
  const data = props.filteredData
    .filter((e) => e.startTime.includes(props.day))
    .sort((a, b) => {
      if (a.course < b.course) return -1;

      if (a.course > b.course) return 1;

      return 0;
    });

  return (
    <table className={classes.scheduleTable}>
      <thead>
        <tr className={classes.tableHead}>
          <th>AEG</th>
          <th>ÕPPEAINE</th>
          <th>ÕPPEJÕUD</th>
          <th>RUUM</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index, self) => {
          return (
            <Fragment key={index}>
              {(index === 0 || item.course !== self[index - 1].course) && (
                <tr className={classes.courseRow}>
                  <td colSpan={4} className={classes.courseName}>
                    {item.course}
                  </td>
                </tr>
              )}
              <TableRow
                rawData={props.rawData}
                data={data}
                key={item.id}
                item={item}
                index={index}
              />
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
