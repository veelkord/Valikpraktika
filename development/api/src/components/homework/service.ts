import {  RowDataPacket, FieldPacket, ResultSetHeader } from "mysql2";
import pool from "../../database";
import Ihomework from "./interface";
// import ISubject from "./interface";


const homeworkService = {
  getAllhomeworks: async (): Promise<Ihomework[] | false> => {
    try {
      const [homeworks]: [Ihomework[], FieldPacket[]] = await pool.query(
        "SELECT homeworks.id, subjects.subjectCode, subjects.id as subjects_id, subjects.subject, homeworks.description, homeworks.dueDate, homeworks.dateCreated, homeworks.dateUpdated, homeworks.dateDeleted FROM scheduleDb.homeworks left join subjects ON homeworks.subjects_id = subjects.Id where homeworks.dateDeleted IS NULL order BY homeworks.id;");
      return homeworks;
    } catch (error) {
      return false;
    }
  },
  gethomeworkId: async (id: number): Promise<Ihomework[] | false | undefined> => {
    try {
      const homework: [Ihomework[], FieldPacket[]] = await pool.query(
        "SELECT homeworks.id, subjects.subjectCode, subjects.id as subjects_id, subjects.subject, homeworks.description, homeworks.dueDate, homeworks.dateCreated, homeworks.dateUpdated, homeworks.dateDeleted FROM scheduleDb.homeworks left join subjects ON homeworks.subjects_id = subjects.Id WHERE homeworks.id = ? AND homeworks.dateDeleted IS NULL LIMIT 1",
        [id]);
      console.log("proovime id järgi leida kodutööd");
      if (homework[0][0] !== undefined) {
        return homework[0];
      }
    } catch (error) {
      return false;
    }
  }, 
  createhomework: async (description: string, dueDate: string, subjects_id: number): Promise<number | false | undefined> => {
    try {
      console.log("4",description, dueDate, subjects_id )
      const [id]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        "INSERT INTO homeworks (description, dueDate, subjects_id) VALUES (?, ?, ?)",
        [description, dueDate, subjects_id]
      );
      return id.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  deletehomework: async (id: number): Promise<boolean | undefined> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        "UPDATE homeworks SET dateDeleted = ? WHERE id = ?",
        [new Date(), id]
      );
      if (result.affectedRows > 0) {
        return true;
      }
    } catch (error) {
      return false;
    }
  },
  updatehomework: async (id:number, description:string, dueDate: string, subjects_id:number): Promise<boolean | undefined> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
        "UPDATE homeworks SET description = ?, dueDate = ?, subjects_id = ? WHERE id = ?",
        [description, dueDate, subjects_id, id]
      );
      if (result.affectedRows > 0) {
        return true;
      }
    } catch (error) {
      return false;
    }
  },
  getSubjectByCode: async (code: string): Promise<any> => {
    try {
      const [subject]: [RowDataPacket[][], FieldPacket[]] = await pool.query(
        "SELECT id FROM subjects WHERE subjectCode = ? AND dateDeleted is NULL",
        [code]
      );
      // console.log(fields);
      return subject[0];
    } catch (error) {
      return false;
    }
  },
  gethomeworkBySubjectCode: async (subCode: string, actualDate: string): Promise<Ihomework[] | false | undefined> => {
   
    // try {
    //   const [subject]: [RowDataPacket[][], FieldPacket[]] = await pool.query(
    //     "SELECT id FROM subjects WHERE subjectCode = ? AND dateDeleted is NULL LIMIT 1",
    //     [subCode]
    //   );
    //   const subjectId = subject[0];
    //   console.log(subjectId);
    // } catch (error) {
    
    // }

  
    try {
      const homework: [Ihomework[], FieldPacket[]] = await pool.query(
        `SELECT homeworks.id, homeworks.description, homeworks.dueDate, homeworks.dateCreated, homeworks.dateUpdated, 
        homeworks.dateDeleted FROM scheduleDb.homeworks 
        WHERE subjects_id = (select id from subjects where subjectCode = ? )
              AND homeworks.dueDate >= (select scheduled.startTime from scheduleDb.scheduled 
                                        WHERE scheduled.subjects_id = (select id from subjects where subjectCode = ? ) 
                                        AND scheduled.startTime <= ? order by scheduled.dateCreated desc limit 1) 
              AND homeworks.dueDate <=      (select scheduled.startTime from scheduleDb.scheduled 
                                        WHERE scheduled.subjects_id = (select id from subjects where subjectCode = ? ) 
                                        AND scheduled.startTime > ? order by scheduled.dateCreated  limit 1) `, 
        [subCode, subCode, actualDate, subCode, actualDate]);
        console.log(actualDate);
      if (homework[0][0] !== undefined) {
        return homework[0];
      }
    } catch (error) {
      return false;
    }
  },
  
};

export default homeworkService;
