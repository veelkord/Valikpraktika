import useAxios from "../../../hooks/useAxios";
import { Fragment, useState, useEffect } from "react";
import classes from "./TableSubjectInfo.module.css";

const getDate = (startTime, endTime) => {


  let d = new Date(startTime);
  let d2 = new Date(endTime);
  let month = 1 + d.getMonth();
  if (month < 10) {
    month = `0${month}`;
  }
  let hour = d.getHours() - 3;
  let minutes = d.getMinutes();
  if (hour < 10) hour = `0${hour}`;
  if (minutes < 10) minutes = `0${minutes}`;

  let hour2 = d2.getHours() - 3;
  let minutes2 = d2.getMinutes();
  if (hour2 < 10) hour2 = `0${hour2}`;
  if (minutes2 < 10) minutes2 = `0${minutes2}`;

  return `${d.getDate()}.${month}.${d.getFullYear()} ${hour}:${minutes}-${hour2}:${minutes2}`;
};

const TableSubjectInfo = (props) => {
const [homework,setHomework] = useState([]);
  const {
    response: homeworkResponse,
    isLoading: homeworkLoading,
    error: homeworkError,
  } = useAxios({ method: "get", url: `/homeworksbycode/${props.item.subjectCode}`});

useEffect(()=> {

  if(!homeworkLoading && homeworkError === '' && homeworkResponse.hasOwnProperty('homework')) {
    // console.log(homeworkResponse);
      // setHomework(...homeworkResponse.homework.filter(e => new Date(e.dueDate).getTime() < new Date(props.item.startTime).getTime() && new Date(e.dueDate).getTime() >( new Date(props.item.startTime).getTime() -(1000*60*60*24*14) ) ));
      setHomework(...homeworkResponse.homework );
    }
}, [homeworkResponse])



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
{homework.description && <tr className={`${classes.extraRowInfo} ${classes.rowInfo}`}>
        <td colSpan={4}>{homework.description} <br/><strong>{`Tähtaeg: ${getDate(homework.dueDate).slice(0,10)}`}</strong></td>
      </tr>}
  {props.item.comment.length > 0  && <tr className={`${classes.extraRowInfo} ${classes.rowHeading}`}>
        <td colSpan={4}>{`Zoomi link: ${props.item.comment}`}</td>
      </tr>}
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
        let time1 = new Date(e.startTime).getTime();
        let time2 = new Date(props.item.startTime).getTime();

        if (e.subject.includes(props.item.subject) && time1 > time2) {
          return (
            <tr
              key={i}
              className={`
      ${classes.extraRowInfo} ${classes.rowInfo}`}
            >
              <td colSpan={4}>{`${getDate(e.startTime, e.endTime)} ${
                e.subject
              }`}</td>
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
