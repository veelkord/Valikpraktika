import { FieldPacket, ResultSetHeader,RowDataPacket } from "mysql2";
import pool from "../../database";
import { ISchedule } from "./interface";

const scheduleService = {
  getEntireSchedule: async (): Promise<ISchedule[] | false> => {
    try {
      const [schedule]: [ISchedule[], FieldPacket[]] = await pool.query(
        `SELECT distinct scheduled.id AS id, scheduled.startTime AS startTime, scheduled.endTime AS endTime, 
        subjects.subjectCode AS subjectCode, subjects.subject AS subject, scheduled.distanceLink AS distanceLink, scheduled.comment, group_concat( DISTINCT concat(lecturers.firstName, " ", lecturers.lastName)) As lecturer, 
        group_concat( DISTINCT courses.course) AS course, group_concat( DISTINCT rooms.room) AS room
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
      console.log(schedule);
      return schedule;
    } catch (error) {
      return false;
    }
  },
  getScheduleByCourse: async (
    courseId: number
  ): Promise<ISchedule[] | false | undefined> => {
    try {
      const [scheduleByCourse]: [ISchedule[], FieldPacket[]] = await pool.query(
        `SELECT scheduled.subjects_id AS id, scheduled.startTime AS startTime, scheduled.endTime AS endTime, scheduled.comment AS comment, rooms.room AS room, courses.course AS course, subjects.subject AS subject, subjects.subjectCode AS subjectCode,
        group_concat(concat(lecturers.firstName, " ", lecturers.lastName)) AS lecturer
        FROM scheduled LEFT JOIN
        rooms ON scheduled.rooms_id = rooms.id LEFT JOIN
        courses ON scheduled.courses_id = courses.id LEFT JOIN
        subjects ON scheduled.subjects_id = subjects.id LEFT JOIN
        lecturers_has_subjects ON subjects.id = lecturers_has_subjects.subjects_id LEFT JOIN
        lecturers ON lecturers.id = lecturers_has_subjects.lecturers_id
            WHERE scheduled.courses_id = ?
        GROUP BY courses.course, rooms.room, scheduled.subjects_id, scheduled.startTime, scheduled.endTime, scheduled.comment
        ORDER BY scheduled.startTime;`,[courseId]);
      
      return scheduleByCourse;
    } catch (error) {
      return false;
    }
  },

// ----------------------
createSchedule: async (startTime:string, endTime:string, room: string, comment:string, course:number, subject:string, 
  firstName:string, lastName:string, distanceLink:string ): Promise<number | false> => {
    let rooms_id: number = 1;
    let courses_id: number = 1;
    let subjects_id: number = 1;
    let lecturers_id: number = 1;   
    try {
      const [roomsid]: [RowDataPacket[], FieldPacket[]] = await pool.query(
        `SELECT id FROM rooms WHERE room = ?`,[room]);
  
      console.log("roomsid: ",roomsid[0].id);
      rooms_id = roomsid[0].id;
    } catch (error) {
      return false;
    }

    try {
      const [courseid]: [RowDataPacket[], FieldPacket[]] = await pool.query(
        `SELECT id FROM courses WHERE course = ?`,[course]);
  
      console.log(courseid[0].id);
      courses_id = courseid[0].id;
    } catch (error) {
      return false;
    }
  
    try {
      const [subjectid]: [RowDataPacket[], FieldPacket[]] = await pool.query(
        `SELECT id FROM subjects WHERE subject = ?`,[subject]);
  
      console.log(subjectid[0].id);
      subjects_id = subjectid[0].id;
    } catch (error) {
      return false;
    }

    console.log("Eesnimi: ",firstName,"Perenimi: ", lastName);
    try {
      const [lecturid]: [RowDataPacket[], FieldPacket[]] = await pool.query(
        `SELECT id FROM lecturers WHERE firstName = ? AND lastName = ?`,[firstName, lastName]);
  
      console.log(lecturid[0].id);
      lecturers_id = lecturid[0].id;
    } catch (error) {
      // return false;
    }



    try {
    const [createdChedule]: [ResultSetHeader, FieldPacket[]] = await pool.query(
      `INSERT INTO scheduled 
      (startTime, endTime, rooms_id, comment, courses_id, subjects_id, lecturers_id, distanceLink) VALUES
      ( ?,?,?,?,?,?,?);`,
      [startTime, endTime, rooms_id, comment, courses_id, subjects_id, lecturers_id, distanceLink] );


    return createdChedule.insertId;
  } catch (error) {
    return false;
  }
},
};

export default scheduleService;
