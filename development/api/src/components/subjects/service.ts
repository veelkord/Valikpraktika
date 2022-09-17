import { FieldPacket, ResultSetHeader } from "mysql2";
import pool from "../../database";
import { ISubject, INewSubject } from "./interfaces";

const subjectServices = {
  getAllSubjects: async (): Promise<ISubject[] | false> => {
    try {
      const [subjects]: [ISubject[], FieldPacket[]] = await pool.query(
        "SELECT * FROM subjects WHERE dateDeleted is NULL"
      );
      return subjects;
    } catch (error) {
      return false;
    }
  },
  getSubjectById: async (id: number): Promise<ISubject | false> => {
    try {
      const [subject]: [ISubject[], FieldPacket[]] = await pool.query(
        "SELECT id, subject, scheduled, dateCreated, dateUpdated, dateDeleted FROM subjects WHERE id = ? AND dateDeleted is NULL",
        [id]
      );
      return subject[0];
    } catch (error) {
      return false;
    }
  },
  createSubject: async (subjectData: INewSubject): Promise<number | false> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        "INSERT INTO subjects SET ?",
        [{ ...subjectData }]
      );
      return result.insertId;
    } catch (error) {
      return false;
    }
  },

  deleteSubject: async (id: number): Promise<boolean | undefined> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        "UPDATE subjects SET dateDeleted = ? WHERE id = ?",
        [new Date(), id]
      );
      if (result.affectedRows > 0) {
        return true;
      }
    } catch (error) {
      return false;
    }
  },
  updateSubjectById: async (data: {
    id: number;
    courses_id?: string;
    scheduled?: string;
  }): Promise<boolean | undefined> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        "UPDATE subjects SET ? WHERE id = ?",
        [{ ...data }, data.id]
      );
      if (result.affectedRows > 0) {
        return true;
      }
    } catch (error) {
      return false;
    }
  },
};

export default subjectServices;
