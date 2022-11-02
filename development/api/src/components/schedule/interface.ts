// Scheduled interfaces

import { RowDataPacket } from "mysql2";



interface Iroom {
  roomId:number
}
interface Icourse {
  courseId:number
}
interface Ilecturer {
  lecturerId:number
}
interface ISchedule extends RowDataPacket {
  id: number;
  startTime: Date;
  endTime: Date;
  rooms: [Iroom];
  comment: string;
  courses: [string];
  subject: string;
  subjectCode: string;
  lecturers: [string];
}
export { ISchedule, Iroom, Icourse, Ilecturer };
