import type { NextFunction, Request, Response } from 'express';
import { WorkflowPayloadSchema } from '../schemas/workflow';
import { StatusCodes } from 'http-status-codes';

export const workflowBodyValidator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = WorkflowPayloadSchema.parse(req.body);
    next();
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.BAD_REQUEST)
  }
}
