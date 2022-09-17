import express, { Request, Response, Application } from "express";
import responseCodes from "../general/responseCodes";
import { INewSubject } from "./interfaces";
import subjectServices from "./service";

const subjectController = {
  getAllSubjects: async (req: Request, res: Response) => {
    const subjects = await subjectServices.getAllSubjects();
    if (subjects) {
      return res.status(responseCodes.ok).json({ subjects });
    }
    return res.status(responseCodes.ServerError).json({
      error: "Server error",
    });
  },
  getSubjectById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const subject = await subjectServices.getSubjectById(id);
    if (subject === false) {
      return res.status(responseCodes.ServerError).json({
        error: "Server error",
      });
    }
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    if (!subject) {
      return res.status(responseCodes.badRequest).json({
        error: `No subject found with id: ${id}`,
      });
    } else {
      return res.status(responseCodes.ok).json({
        subject,
      });
    }
  },
  addSubject: async (req: Request, res: Response) => {
    const { lecturers_id, courses_id, subject, scheduled } = req.body;
    if (!subject) {
      return res.status(responseCodes.badRequest).json({
        error: "Subject is missing",
      });
    }
    if (!scheduled) {
      return res.status(responseCodes.badRequest).json({
        error: "Scheduled is missing",
      });
    }
    if (!courses_id) {
      return res.status(responseCodes.badRequest).json({
        error: "Course id is missing",
      });
    }
    if (!lecturers_id) {
      return res.status(responseCodes.badRequest).json({
        error: "Lecturer id is missing",
      });
    } else {
      const subjectData: INewSubject = {
        lecturers_id,
        courses_id,
        subject,
        scheduled,
      };
      const id = await subjectServices.createSubject(subjectData);
      if (id) {
        return res.status(responseCodes.created).json({
          id,
        });
      }
      return res.status(responseCodes.ServerError).json({
        error: "Server error",
      });
    }
  },
  deleteSubject: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    const subjectExists = await subjectServices.deleteSubject(id);
    if (subjectExists === undefined) {
      return res.status(responseCodes.badRequest).json({
        message: `Subject not found with id: ${id}`,
      });
    }
    if (subjectExists) {
      return res.status(responseCodes.noContent).send();
    }
    return res.status(responseCodes.ServerError).json({
      error: "Server error",
    });
  },

  updateSubjectById: async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { courses_id, scheduled } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: "No valid id provided",
      });
    }
    if (!courses_id && !scheduled) {
      return res.status(responseCodes.badRequest).json({
        error: "Nothing to update",
      });
    }
    const subjectExists = await subjectServices.updateSubjectById({
      id,
      courses_id,
      scheduled,
    });
    if (subjectExists === undefined) {
      return res.status(responseCodes.badRequest).json({
        error: `No subject found with id: ${id}`,
      });
    }
    if (subjectExists === false) {
      return res.status(responseCodes.ServerError).json({
        error: "Server error",
      });
    }

    return res.status(responseCodes.noContent).send();
  },
};

export default subjectController;
