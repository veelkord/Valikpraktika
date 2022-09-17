import { RowDataPacket } from "mysql2";

interface ICourse extends RowDataPacket {
  id: number;
  course: string;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

export default ICourse;
