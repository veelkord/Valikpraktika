import { Request, Response } from "express";
import responseCodes from "../general/responseCodes";
import { ISchedule } from "./interface";
import scheduleService from "./service";

const scheduleController = {
  getEntireSchedule: async (req: Request, res: Response) => {
    const schedule = await scheduleService.getEntireSchedule();
    if (schedule) {
      return res.status(responseCodes.ok).json({ schedule });
    }
    return res.status(responseCodes.ServerError).json({
      error: "Server error",
    });
  },


createSchedule: async (req: Request, res: Response) => {
  const { startTime, endTime, rooms, comment, courses, subjectId, lecturers,
  distanceLink } = req.body;
  let startTimeFormatted:string ;
  let endTimeFormatted:string ;

  if (startTime.length>19){
    startTimeFormatted = startTime.substr(0, 19);
    startTimeFormatted = startTimeFormatted.replace("T"," ");
  }  else { startTimeFormatted = startTime.replace("T"," ");  }
  
  if (endTime.length>19){
    endTimeFormatted = endTime.substr(0, 19);
    endTimeFormatted = endTimeFormatted.replace("T"," ");
  } else { endTimeFormatted = endTime.replace("T"," "); }

  console.log(startTimeFormatted, endTimeFormatted);

  if (!startTime) {
    return res.status(responseCodes.badRequest).json({
      error: "startTime is missing",
    });
  }

  if (!endTime) {
    return res.status(responseCodes.badRequest).json({
      error: "endTime is missing",
    });
  }
  // const lecturerName = lecturer.split(" ");
  // const lecturerFist = lecturerName[0];
  // const lecturerLast = lecturerName[1];

  const scheduleId = await scheduleService.createSchedule(startTimeFormatted, endTimeFormatted, rooms, comment, courses, subjectId, 
    lecturers, distanceLink);
  if (scheduleId) {
    return res.status(responseCodes.ok).json({ scheduleId });
  }
  return res.status(responseCodes.ServerError).json({
    error: "Server error",
  });
},
};

export default scheduleController;
