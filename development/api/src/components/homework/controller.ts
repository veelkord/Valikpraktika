import { Request, Response } from "express";
import responseCodes from "../general/responseCodes";
import homeworkService from "./service";

const homeworkController = {
  getAllHomeworks: async (req: Request, res: Response) => {
    const homeworks = await homeworkService.getAllhomeworks();
    if (!homeworks) {
      return res.status(responseCodes.ServerError).json({
        error: "Server error",
      });
    }
    return res.status(responseCodes.ok).json({
      homeworks,
    });
  },
  getHomeworkById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    console.log("HomeworkbyID");
    const homework = await homeworkService.gethomeworkId(id);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    if (homework == undefined) {
      return res.status(responseCodes.badRequest).json({
        error: `No homework found with id: ${id}`,
      });
    }
    if (!homework) {
      return res.status(responseCodes.ServerError).json({
        error: "Server error",
      });
    }
    return res.status(responseCodes.ok).json({
      homework,
    });
  },
  addHomework: async (req: Request, res: Response) => {
    let { description, dueDate, subjectCode, subjects_id } = req.body;
    

    if (!description) {
      return res.status(responseCodes.badRequest).json({
        error: "homework description is missing",
      });
    }
    console.log("2",description, dueDate, subjectCode, subjects_id )
    if (!dueDate) {
      return res.status(responseCodes.badRequest).json({
        error: "homework dueDate is missing",
      });
    }
    if (!subjectCode && !subjects_id) {
      return res.status(responseCodes.badRequest).json({
        error: "homework subjectCode or subjects_id is missing",
      });
    }
    if(!subjects_id) {
      const subjectId = await homeworkService. getSubjectByCode(subjectCode);
      console.log(subjectId.id);
      subjects_id = subjectId.id;
    }
    console.log(description, dueDate, subjects_id);
    const id = await homeworkService.createhomework(description, dueDate, subjects_id);
    if (!id) {
      return res.status(responseCodes.ServerError).json({
        error: "Server error",
      });
    }
    return res.status(responseCodes.created).json({
      id,
    });
  },











  deleteHomework: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    console.log(id);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    const subjectExists = await homeworkService.deletehomework(id);
    if (subjectExists == undefined) {
      return res.status(responseCodes.badRequest).json({
        message: `homework not found with id: ${id}`,
      });
    }
    if (!subjectExists) {
      return res.status(responseCodes.ServerError).json({
        error: "Server error",
      });
    }
    return res.status(responseCodes.noContent).send();
  },
  updateHomeworkById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { homework } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    if (!homework) {
      return res.status(responseCodes.badRequest).json({
        error: "Nothing to update",
      });
    }
    const homeworkExists = await homeworkService.updatehomework({
      id,
      homework,
    });
    if (homeworkExists === undefined) {
      return res.status(responseCodes.badRequest).json({
        error: `No homework found with id: ${id}`,
      });
    }
    if (!homeworkExists) {
      return res.status(responseCodes.ServerError).json({
        error: "Server error",
      });
    }
    return res.status(responseCodes.noContent).send();
  },
};

export default homeworkController;
