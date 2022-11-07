// Scheduled interfaces

import { RowDataPacket } from "mysql2";



interface Iroom {
 roomId?:number
  room?:string 

}
interface Icourse {
  courseId?:number
  course?:string
}
interface Ilecturer {
  lecturerId?:number
  firstName?:string
  lastName?:string
}
interface ISchedule extends RowDataPacket {
  id: number;
  startTime: Date;
  endTime: Date;
  rooms: Iroom[] | null;
  comment: string;
  courses: Icourse[] | null;
  subject: string;
  subjectCode: string;
  lecturers: Ilecturer[] | null;
  atDate?:Date;
  toDate?:Date;
}
export { ISchedule, Iroom, Icourse, Ilecturer };
