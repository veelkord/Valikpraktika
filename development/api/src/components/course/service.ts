import { FieldPacket, ResultSetHeader } from "mysql2";
import pool from "../../database";
import ICourse from "./interface";

const courseService = {
  getAllCourses: async (): Promise<ICourse[] | false> => {
    try {
      const [courses]: [ICourse[], FieldPacket[]] = await pool.query(
        "SELECT * FROM courses WHERE dateDeleted IS NULL"
      );
      return courses;
    } catch (error) {
      return false;
    }
  },
  getCourseId: async (id: number): Promise<ICourse[] | false | undefined> => {
    try {
      const course: [ICourse[], FieldPacket[]] = await pool.query(
        "SELECT course FROM courses WHERE id = ? AND dateDeleted IS NULL LIMIT 1",
        [id]
      );
      if (course[0][0] !== undefined) {
        return course[0];
      }
    } catch (error) {
      return false;
    }
  },
  createCourse: async (course: string): Promise<number | false | undefined> => {
    try {
      const [id]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        "INSERT INTO courses SET course = ?",
        [course]
      );
      return id.insertId;
    } catch (error) {
      return false;
    }
  },
  deleteCourse: async (id: number): Promise<boolean | undefined> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        "UPDATE courses c LEFT OUTER JOIN subjects s ON c.id = s.courses_id SET c.dateDeleted = ? WHERE s.courses_id IS NULL AND c.id = ?",
        [new Date(), id]
      );
      if (result.affectedRows > 0) {
        return true;
      }
    } catch (error) {
      return false;
    }
  },
  updateCourse: async (data: {
    id: number;
    course: string;
  }): Promise<boolean | undefined> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        "UPDATE courses SET course = ? WHERE id = ?",
        [data.course, data.id]
      );
      if (result.affectedRows > 0) {
        return true;
      }
    } catch (error) {
      return false;
    }
  },
};

export default courseService;
