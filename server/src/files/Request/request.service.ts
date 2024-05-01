import * as requestRepository from "./request.repository";

export const createRequestService = async (data: object) => {
  return await requestRepository.createRequest(data);
};

export const getAllRequestsService = async () => {
  return await requestRepository.getAllRequests();
};

export const getRequestByIdService = async (id: string) => {
  return await requestRepository.getRequestById(id);
};

export const updateRequestService = async (id : string | number, data: object) => {
  return await requestRepository.updateRequest(id, data);
};

export const deleteRequestService = async (id: string | number) => {
  return await requestRepository.deleteRequest(id);
};
