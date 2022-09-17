import { Request, Response } from "express";
import loginService from "./service";
import responseCodes from "../general/responseCodes";

const authController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await loginService.login(email, password);
    if (token === undefined) {
      return res.status(responseCodes.notAuthorized).json({
        error: "Check credentials",
      });
    }
    if (!token) {
      return res.status(responseCodes.ServerError).json({
        error: "Server error",
      });
    }
    if (token === "0") {
      return res.status(responseCodes.notAuthorized).json({
        error: "Check password",
      });
    }
    return res.status(responseCodes.ok).json({
      token,
    });
  },
};

export default authController;
