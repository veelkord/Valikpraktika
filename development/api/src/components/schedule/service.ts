import { FieldPacket, ResultSetHeader } from "mysql2";
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
        ORDER BY scheduled.startTime;`[courseId]
      );
      return scheduleByCourse;
    } catch (error) {
      return false;
    }
  },
};

export default scheduleService;
