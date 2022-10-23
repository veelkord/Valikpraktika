// import React, { useState, useEffect, useCallback, Fragment } from "react";
// import classes from "./Home.module.css";
// import useAxios from "../hooks/useAxios";

// import ScheduleFilters from "../components/searchFilters/ScheduleFilters";
// import TableBody from "../components/UI/Table/TableBody";

// const Home = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const { response, loading, error } = useAxios({
//     method: "get",
//     url: "/schedule",
//   });

//   const [dropdownsSelection, setDropdownSelection] = useState([]);

//   const work_Data = useCallback(() => {
//     if (!loading && response !== undefined) {
//       let schedule = response.schedule;
//       schedule.forEach(function (o) {
//         Object.keys(o).forEach(function (k) {
//           if (o[k] === null) {
//             o[k] = "";
//           }
//         });
//       });
//       setData(schedule);
//       setFilteredData(schedule);
//     }
//   }, [loading, response]);

//   const convertDate = (dbDate) => {
//     const d = new Date(dbDate);
//     const days = [
//       "Pühapäev",
//       "Esmaspäev",
//       "Teisipäev",
//       "Kolmapäev",
//       "Neljapäev",
//       "Reede",
//       "Laupäev",
//     ];
//     // console.log(days[d.getDay()]);
//     return d.toDateString();
//   };

//   useEffect(() => {
//     work_Data();
//   }, [work_Data]);

//   const dropdownController = (data, obj) => {
//     let obje = data.filter((e) => e[obj.flatMap(Object.keys)[0]] === undefined);
//     if (
//       obj[0].value === "course" ||
//       obj[0].value === "subject" ||
//       obj[0].value === "lecturer" ||
//       obj[0].value === "room"
//     ) {
//       return [...data.filter((e) => e[obj[0].value] === undefined)];
//     }
//     return [...obj, ...obje];
//   };

//   const scheduleFilter = (filterObj, rawData, filterType) => {
//     let filteredObjects = filterObj.filter((e) => e[filterType]);
//     let objectKeys = filteredObjects.flatMap(Object.keys);
//     let objectValues = filteredObjects.flatMap(Object.values);
//     let filteredeData = [];

//     for (let i = 0; i < objectValues.length; i++) {
//       filteredeData.push(
//         ...rawData.filter((e) => e[objectKeys[i]].includes(objectValues[i]))
//       );
//     }
//     filteredeData = filteredeData.filter(
//       (value, index, self) => index === self.findIndex((t) => t.id === value.id)
//     );

//     return filteredeData;
//   };

//   const dataFilterHandler = (dropdownValues) => {
//     setDropdownSelection((prevState) => {
//       return [...dropdownController(prevState, dropdownValues)];
//     });
//   };

//   useEffect(() => {
//     const hasCourse = dropdownsSelection.find((o) => o.course);
//     const hasSubject = dropdownsSelection.find((o) => o.subject);
//     const hasLecturer = dropdownsSelection.find((o) => o.lecturer);
//     const hasRoom = dropdownsSelection.find((o) => o.room);
//     if (hasCourse) {
//       setFilteredData([...scheduleFilter(dropdownsSelection, data, "course")]);
//     }
//     if (hasSubject) {
//       setFilteredData((prevState) => {
//         return [
//           ...scheduleFilter(
//             dropdownsSelection,
//             hasCourse ? prevState : data,
//             "subject"
//           ),
//         ];
//       });
//     }
//     if (hasLecturer) {
//       setFilteredData((prevState) => {
//         return [
//           ...scheduleFilter(
//             dropdownsSelection,
//             hasCourse || hasSubject ? prevState : data,
//             "lecturer"
//           ),
//         ];
//       });
//     }
//     if (hasRoom) {
//       setFilteredData((prevState) => {
//         return [
//           ...scheduleFilter(
//             dropdownsSelection,
//             hasCourse || hasLecturer || hasSubject ? prevState : data,
//             "room"
//           ),
//         ];
//       });
//     }
//     if (dropdownsSelection.length === 0) {
//       setFilteredData([...data]);
//     }
//   }, [data, dropdownsSelection]);

//   filteredData.sort(
//     (objA, objB) =>
//       Number(new Date(objA.startTime)) - Number(new Date(objB.startTime))
//   );
//   const convertDay = (dbDate) => {
//     let d = new Date(dbDate);
//     const days = [
//       "Pühapäev",
//       "Esmaspäev",
//       "Teisipäev",
//       "Kolmapäev",
//       "Neljapäev",
//       "Reede",
//       "Laupäev",
//     ];

//     return days[d.getDay()];
//   };

//   return (
//     <Fragment>
//       <div className={classes.container}>
//         <ScheduleFilters onPassingFilters={dataFilterHandler} />
//         {error && <p>`Error: ${error}`</p>}
//         {!loading && (
//           <table className="styled-table">
//             <thead>
//               <tr>
//                 <th style={{ textAlign: "center" }}></th>
//                 <th style={{ textAlign: "center" }}>Kursus</th>
//                 <th style={{ textAlign: "center" }}>Aeg</th>
//                 <th style={{ textAlign: "center" }}>Õppeaine</th>
//                 <th style={{ textAlign: "center" }}>Õppejõud</th>
//                 <th style={{ textAlign: "center" }}>Ruum</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((item, index, array) => {
//                 let currentItemDate = new Date(item.startTime).toDateString();
//                 let previousItemDate;
//                 let hasNewDay = false;
//                 let mapNewDay = false;

//                 if (index > 0) {
//                   previousItemDate = new Date(
//                     array[index - 1].startTime
//                   ).toDateString();
//                   previousItemDate === currentItemDate
//                     ? (hasNewDay = true)
//                     : (hasNewDay = false);
//                 }
//                 if (previousItemDate === undefined) {
//                   mapNewDay = true;
//                   hasNewDay = true;
//                 }

//                 return (
//                   <Fragment key={index}>
//                     {hasNewDay && (
//                       <Fragment>
//                         {mapNewDay && (
//                           <Fragment>
//                             <tr>
//                               <td>{convertDay(item.startTime)}</td>
//                               <td></td>
//                             </tr>
//                             <tr>
//                               <th></th>
//                               <td>AEG</td>
//                               <td>ÕPPEAINE</td>
//                               <td>ÕPPEJÕUD</td>
//                               <td>RUUM</td>
//                             </tr>
//                           </Fragment>
//                         )}
//                         <TableBody
//                           item={item}
//                           index={index}
//                           onConvertDate={convertDate}
//                         />
//                       </Fragment>
//                     )}
//                     {!hasNewDay && (
//                       <Fragment>
//                         <tr style={{ height: "20px" }}></tr>
//                         {!mapNewDay && (
//                           <Fragment>
//                             <tr>
//                               <td> {convertDay(item.startTime)}</td>
//                             </tr>
//                             <tr>
//                               <th></th>
//                               <td>AEG</td>
//                               <td>ÕPPEAINE</td>
//                               <td>ÕPPEJÕUD</td>
//                               <td>RUUM</td>
//                             </tr>
//                           </Fragment>
//                         )}
//                         <TableBody
//                           item={item}
//                           index={index}
//                           onConvertDate={convertDate}
//                         />
//                       </Fragment>
//                     )}
//                   </Fragment>
//                 );
//               })}
//             </tbody>
//             <tbody>
//               <tr>
//                 <th>hlh</th>
//                 <td>gjgj</td>
//               </tr>
//             </tbody>
//           </table>
//         )}
//         <div></div>
//       </div>
//     </Fragment>
//   );
// };

// export default Home;
