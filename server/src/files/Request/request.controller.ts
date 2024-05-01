import { Request, Response } from "express";
import * as requestService from "./request.service";
import { messages } from "./request.messages";
import logger from "../../logger";

export const createRequest = async (req: Request, res: Response) => {
  try {
    const data = {
      image: req.file?.path,
      ...req.body,
    };
    const request = await requestService.createRequestService(data);
    res.status(201).json({ message: messages.REQUEST_CREATED, request });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: messages.REQUEST_ERROR });
  }
};

export const getAllRequests = async (req: Request, res: Response) => {
  try {
    const requests = await requestService.getAllRequestsService();
    res.json(requests);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: messages.REQUEST_ERROR });
  }
};

export const getRequestById = async (req: Request, res: Response) => {
  try {
    const request = await requestService.getRequestByIdService(req.params.id);
    res.json(request);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: messages.REQUEST_ERROR });
  }
};

export const updateRequest = async (req: Request, res: Response) => {
  try {
    const request = await requestService.updateRequestService(
      req.params.id,
      req.body
    );
    res.json({ message: messages.REQUEST_UPDATED, request });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: messages.REQUEST_ERROR });
  }
};

export const deleteRequest = async (req: Request, res: Response) => {
  try {
    await requestService.deleteRequestService(req.params.id);
    res.status(204).end();
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: messages.REQUEST_ERROR });
  }
};
