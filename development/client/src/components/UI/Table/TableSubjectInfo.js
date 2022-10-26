import useAxios from "../../../hooks/useAxios";
import { Fragment, useState, useEffect } from "react";
import classes from "./TableSubjectInfo.module.css";
import * as dateService from "../../../utils/Format/Date";

const TableSubjectInfo = (props) => {
  const [homework, setHomework] = useState([]);
  const {
    response: homeworkResponse,
    isLoading: homeworkLoading,
    error: homeworkError,
  } = useAxios({
    method: "get",
    url: `/homeworksbycode/${props.item.subjectCode}`,
    body: { actualDate: props.item.startTime },
  });

  useEffect(() => {
    if (
      !homeworkLoading &&
      homeworkError === "" &&
      homeworkResponse.hasOwnProperty("homework")
    ) {
      // setHomework(...homeworkResponse.homework.filter(e => new Date(e.dueDate).getTime() < new Date(props.item.startTime).getTime() && new Date(e.dueDate).getTime() >( new Date(props.item.startTime).getTime() -(1000*60*60*24*14) ) ));
      setHomework(...homeworkResponse.homework);
    }
  }, [homeworkResponse, homeworkError, homeworkLoading]);

  return (
    <Fragment>
      <tr
        className={`${classes.extraRowInfo} ${classes.rowHeading} ${classes.headingPadding}`}
      >
        <td colSpan={3} style={{ borderRight: "0rem" }}>
          Õppeinfo:
        </td>
        <td className={classes.close}>
          <i
            onClick={props.onClick}
            className={`bi bi-x-lg ${classes.closeIcon}`}
          ></i>
        </td>
      </tr>
      {homework.description && (
        <tr className={`${classes.extraRowInfo} ${classes.rowInfo}`}>
          <td colSpan={4}>
            {homework.description} <br />
            <strong>{`Tähtaeg: ${dateService.formatDate(
              homework.dueDate
            )}`}</strong>
          </td>
        </tr>
      )}
      {props.item.comment.length > 0 && (
        <tr className={`${classes.extraRowInfo} ${classes.rowHeading}`}>
          <td colSpan={4}>{`Zoomi link: ${props.item.comment}`}</td>
        </tr>
      )}
      {props.item.subjectCode.length > 4 && (
        <tr className={`${classes.extraRowInfo} ${classes.rowHeading}`}>
          <td colSpan={4}>
            Link ainekaardile:<br></br>
            <a
              href={`https://ois2.tlu.ee/tluois/aine/${props.item.subjectCode}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`https://ois2.tlu.ee/tluois/aine/${props.item.subjectCode}`}
            </a>
          </td>
        </tr>
      )}
      <tr className={`${classes.extraRowInfo} ${classes.rowHeading}`}>
        <td colSpan={4}>{`${props.item.subject} järgmised toimumisajad:`}</td>
      </tr>
      {props.rawData.map((e, i) => {
        let time1 = dateService.formatMilliseconds(e.startTime);
        let time2 = dateService.formatMilliseconds(props.item.startTime);

        if (e.subject.includes(props.item.subject) && time1 > time2) {
          return (
            <tr
              key={i}
              className={`
      ${classes.extraRowInfo} ${classes.rowInfo}`}
            >
              <td colSpan={4}>{`${dateService
                .formatDateTime(e.startTime)
                .toString()}-${dateService
                .formatHoursMinutes(e.endTime)
                .toString()} ${e.subject}`}</td>
            </tr>
          );
        }
        return null;
      })}
      <tr>
        <td colSpan={4} className={classes.bottomRow}></td>
      </tr>
    </Fragment>
  );
};

export default TableSubjectInfo;
