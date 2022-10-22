import { RowDataPacket } from "mysql2";

interface Ihomework extends RowDataPacket {
  id: number;
  desription: string;
  dueDate: Date;
  subjectCode: number | null;
  subjects_Id: number | null;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

// interface ISubject extends RowDataPacket {
//   id: number;
//   subject: string;
//   subjectCode: string;
//   creditPoint: number;
//   dateCreated: Date;
//   dateUpdated: Date;
//   dateDeleted: Date | null;
// }

// interface INewSubject {
//   subject: string;
//   subjectCode: string;
//   creditPoint: number;
// }


export default Ihomework;

