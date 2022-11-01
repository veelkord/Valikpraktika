import { FieldPacket, ResultSetHeader,RowDataPacket } from "mysql2";
import pool from "../../database";
import { ISchedule } from "./interface";

const scheduleService = {
  getEntireSchedule: async (): Promise<ISchedule[] | false> => {
    try {
      const [schedule]: [ISchedule[], FieldPacket[]] = await pool.query(
        `SELECT scheduled.id AS id, scheduled.startTime AS startTime, scheduled.endTime AS endTime, scheduled.comment AS comment, rooms.room AS room, courses.course AS course, subjects.subject AS subject, subjects.subjectCode AS subjectCode,
        group_concat(concat(lecturers.firstName, " ", lecturers.lastName)) AS lecturer
        FROM scheduled LEFT JOIN
        rooms ON scheduled.rooms_id = rooms.id LEFT JOIN
        courses ON scheduled.courses_id = courses.id LEFT JOIN
        subjects ON scheduled.subjects_id = subjects.id LEFT JOIN
        lecturers_has_subjects ON subjects.id = lecturers_has_subjects.subjects_id LEFT JOIN
        lecturers ON lecturers.id = lecturers_has_subjects.lecturers_id
        GROUP BY id, startTime, endTime, comment, room, course, subject, subjectCode
        ORDER BY scheduled.startTime;`
      );
      console.log(schedule);
      return schedule;
    } catch (error) {
      return false;
    }
  },
  // getScheduleByCourse: async (
  //   courseId: number
  // ): Promise<ISchedule[] | false | undefined> => {
  //   try {
  //     const [scheduleByCourse]: [ISchedule[], FieldPacket[]] = await pool.query(
  //       `SELECT scheduled.subjects_id AS id, scheduled.startTime AS startTime, scheduled.endTime AS endTime, scheduled.comment AS comment, rooms.room AS room, courses.course AS course, subjects.subject AS subject, subjects.subjectCode AS subjectCode,
  //       group_concat(concat(lecturers.firstName, " ", lecturers.lastName)) AS lecturer
  //       FROM scheduled LEFT JOIN
  //       rooms ON scheduled.rooms_id = rooms.id LEFT JOIN
  //       courses ON scheduled.courses_id = courses.id LEFT JOIN
  //       subjects ON scheduled.subjects_id = subjects.id LEFT JOIN
  //       lecturers_has_subjects ON subjects.id = lecturers_has_subjects.subjects_id LEFT JOIN
  //       lecturers ON lecturers.id = lecturers_has_subjects.lecturers_id
  //           WHERE scheduled.courses_id = ?
  //       GROUP BY courses.course, rooms.room, scheduled.subjects_id, scheduled.startTime, scheduled.endTime, scheduled.comment
  //       ORDER BY scheduled.startTime;`,[courseId]);
      
  //     return scheduleByCourse;
  //   } catch (error) {
  //     return false;
  //   }
  // },

// ----------------------
createSchedule: async (startTime:string, endTime:string, room: string, comment:string, course:string, subject:number, 
  lecturer:string, distanceLink:string ): Promise<number | false> => {

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
    
    
    const rooms =  eval(room);
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

    const courses =  eval(course);
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

    const lecturers =  eval(lecturer);
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





    // try {
    //   const [roomsid]: [RowDataPacket[], FieldPacket[]] = await pool.query(
    //     `SELECT id FROM rooms WHERE room = ?`,[room]);
  
    //   console.log("roomsid: ",roomsid[0].id);
    //   rooms_id = roomsid[0].id;
    // } catch (error) {
    //   return false;
    // }

    // try {
    //   const [courseid]: [RowDataPacket[], FieldPacket[]] = await pool.query(
    //     `SELECT id FROM courses WHERE course = ?`,[course]);
  
    //   console.log(courseid[0].id);
    //   courses_id = courseid[0].id;
    // } catch (error) {
    //   return false;
    // }
  
    // try {
    //   const [subjectid]: [RowDataPacket[], FieldPacket[]] = await pool.query(
    //     `SELECT id FROM subjects WHERE subject = ?`,[subject]);
  
    //   console.log(subjectid[0].id);
    //   subjects_id = subjectid[0].id;
    // } catch (error) {
    //   return false;
    // }

    // console.log("Eesnimi: ",firstName,"Perenimi: ", lastName);
    // try {
    //   const [lecturid]: [RowDataPacket[], FieldPacket[]] = await pool.query(
    //     `SELECT id FROM lecturers WHERE firstName = ? AND lastName = ?`,[firstName, lastName]);
  
    //   console.log(lecturid[0].id);
    //   lecturers_id = lecturid[0].id;
    // } catch (error) {
    //   // return false;
    // }