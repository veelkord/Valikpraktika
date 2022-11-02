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
  rooms: Iroom[];
  comment: string;
  courses: Icourse[];
  subject: string;
  subjectCode: string;
  lecturers: Ilecturer[];
}
export { ISchedule, Iroom, Icourse, Ilecturer };
