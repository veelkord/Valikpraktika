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
};

export default scheduleController;
