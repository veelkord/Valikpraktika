// Interfaces

import { RowDataPacket } from "mysql2";


// interface ISubject extends RowDataPacket {
//   id: number;
//   lecturers_id: number;
//   coursesid: number;
//   subject: string;
//   scheduled: string;
//   dateCreated: Date;
//   dateUpdated: Date;
//   dateDeleted: Date | null;
// }

// interface INewSubject {
//   lecturers_id: number;
//   courses_id: number;
//   subject: string;
//   scheduled: string;
// }

interface ISubject extends RowDataPacket {
  id: number;
  subject: string;
  subjectCode: string;
  creditPoint: number;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

interface INewSubject {
  subject: string;
  subjectCode: string;
  creditPoint: number;
}


export { ISubject, INewSubject };
