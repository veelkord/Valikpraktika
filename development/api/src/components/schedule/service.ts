import { FieldPacket, ResultSetHeader,RowDataPacket } from "mysql2";
import pool from "../../database";
import { ISchedule, Iroom, Ilecturer, Icourse } from "./interface";

const scheduleService = {
  getEntireSchedule: async (): Promise<ISchedule[] | false> => {
    try {
      const [schedule]: [ISchedule[], FieldPacket[]] = await pool.query(
        `        SELECT distinct scheduled.id AS id, scheduled.startTime AS startTime, scheduled.endTime AS endTime, 
        subjects.subjectCode AS subjectCode, subjects.subject AS subject, scheduled.distanceLink AS distanceLink, scheduled.comment, 
        group_concat( DISTINCT lecturers.id) As strLecturersId,
        group_concat( DISTINCT lecturers.firstName) As strLecturersFirstName,
        group_concat( DISTINCT lecturers.lastName) As strLecturersLastName,
        group_concat( DISTINCT courses.id) AS strCoursesId,
        group_concat( DISTINCT courses.course) AS strCourses,  
		    group_concat( DISTINCT rooms.id) as strRoomsId,
	    	group_concat( DISTINCT rooms.room) as strRooms
        FROM scheduled inner JOIN
        subjects ON scheduled.subjects_id = subjects.id INNER JOIN
        scheduled_has_lecturers ON scheduled.id = scheduled_has_lecturers.schedule_id inner JOIN
        lecturers ON scheduled_has_lecturers.lecturers_id = lecturers.id inner JOIN
        scheduled_has_courses ON scheduled.id = scheduled_has_courses.scheduled_id inner JOIN
        courses ON scheduled_has_courses.courses_id = courses.id INNER JOIN
        scheduled_has_rooms ON scheduled.id = scheduled_has_rooms.scheduled_id INNER JOIN
        rooms ON scheduled_has_rooms.rooms_id = rooms.id
        GROUP BY id, startTime, endTime, scheduled.comment, subjects.subjectCode, subjects.subject, scheduled.distanceLink
        ORDER BY scheduled.startTime ;`
      );
      let i = 0;
      while (i < schedule.length) {
        let tmpArrId = schedule[i].strRoomsId.split(',');
        let tmpArrVal = schedule[i].strRooms.split(',');

        let n=0; let arr=[]; 
        let objRoom:Iroom = {};

          while (n<tmpArrId.length) {
            objRoom['roomId'] = tmpArrId[n]*1;
            objRoom['room'] = tmpArrVal[n];
              arr.push(objRoom);
              n++
          }
        schedule[i].rooms = arr;

        tmpArrId = schedule[i].strCoursesId.split(',');
        tmpArrVal = schedule[i].strCourses.split(',');

        n=0; arr=[]; 
        let objCourse:Icourse = {} ;

          while (n<tmpArrId.length) {
            objCourse['courseId'] = tmpArrId[n]*1;
            objCourse['course'] = tmpArrVal[n];
            arr.push(objCourse);
            n++
          }
      schedule[i].courses = arr;

      tmpArrId = schedule[i].strLecturersId.split(',');
      let tmpArrVal1 = schedule[i].strLecturersFirstName.split(',');
      let tmpArrVal2 = schedule[i].strLecturersLastName.split(',');

      n=0; arr=[]; 
      let objLecturer:Ilecturer = {} ;

        while (n<tmpArrId.length) {
          objLecturer['lecturerId'] = tmpArrId[n]*1;
          objLecturer['firstName'] = tmpArrVal1[n];
          objLecturer['lastName'] = tmpArrVal2[n];
          arr.push(objLecturer);
          n++
    }
      schedule[i].lecturers = arr;
      delete schedule[i].strRoomsId;
      delete schedule[i].strRooms;
      delete schedule[i].strCoursesId;
      delete schedule[i].strCourses;
      delete schedule[i].strLecturersId;
      delete schedule[i].strLecturersFirstName;
      delete schedule[i].strLecturersLastName;
        i++;
      }
      return schedule;

    } catch (error) {
      return false;
    }
  },
  

// ----------------------
createSchedule: async (startTime:string, endTime:string, rooms: Array<Iroom>, comment:string, courses: Array<Icourse>, subject:number, 
  lecturers: Array<Ilecturer>, distanceLink:string ): Promise<number | false> => {

    let createdscheduleId: number;

    try {
    const [createdChedule]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        `INSERT INTO scheduled 
        (startTime, endTime, comment, subjects_id, distanceLink) VALUES
        ( ?,?,?,?,?);`,
        [startTime, endTime, comment, subject, distanceLink] );
        createdscheduleId =  createdChedule.insertId;  
      // return createdChedule.insertId;
    } catch (error) {
      return false;
    }
    
    

    for (var index in rooms) {
      console.log("uus kirje sceduled:", createdscheduleId, " Rooms_id:", rooms[index].roomId);
      try {
          const [createdChedule]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        `INSERT INTO scheduled_has_rooms (scheduled_id, rooms_id) 
        VALUES ('?', '?');`, [createdscheduleId, rooms[index].roomId] );
      } catch (error) {
        return false;
      }
    }  


    console.log(courses);
    for (var index in courses) {
      console.log("uus kirje sceduled:", createdscheduleId, " courses_id:", courses[index].courseId);
      try {
          const [createdChedule]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        `INSERT INTO scheduled_has_courses (scheduled_id, courses_id) 
        VALUES ('?', '?');`, [createdscheduleId, courses[index].courseId] );
      } catch (error) {
        return false;
      }
    } 

    console.log(lecturers);
    for (var index in lecturers) {
      console.log("uus kirje sceduled:", createdscheduleId, " lecturers_id:", lecturers[index].lecturerId);
      try {
          const [createdChedule]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        `INSERT INTO scheduled_has_lecturers (schedule_id, lecturers_id) 
        VALUES ('?', '?');`, [createdscheduleId, lecturers[index].lecturerId] );
      } catch (error) {
        return false;
      }
    }  



    
    return  createdscheduleId;
  },    
};

export default scheduleService;

