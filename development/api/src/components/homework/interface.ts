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


export default Ihomework;

