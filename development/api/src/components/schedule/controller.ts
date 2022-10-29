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
  const { startTime, endTime, room, comment, course, subject, lecturer,
  distanceLink } = req.body;

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
  const lecturerName = lecturer.split(" ");
  const lecturerFist = lecturerName[0];
  const lecturerLast = lecturerName[1];

  const schedule = await scheduleService.createSchedule(startTime, endTime, room, comment, course, subject, 
    lecturerFist, lecturerLast, distanceLink);
  if (schedule) {
    return res.status(responseCodes.ok).json({ schedule });
  }
  return res.status(responseCodes.ServerError).json({
    error: "Server error",
  });
},
};

export default scheduleController;
