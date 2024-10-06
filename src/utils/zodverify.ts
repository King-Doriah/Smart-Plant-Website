import { Response } from "express";

export const zodVerify = (data: any, res: Response) => {
  for (let i = 0; i < data.error.issues.length; i++) {
    if (data.error.issues[i].code === "too_small") {
      return res.status(401).json({
        status: 401,
        message: data.error.issues[i].message,
        data: {},
      });
    }
    if (data.error.issues[i].code === "invalid_type") {
      return res.status(401).json({
        status: 401,
        message: "Informe todos os dados corretamente.",
        data: {},
      });
    }
  }
};
