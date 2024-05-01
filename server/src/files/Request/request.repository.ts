import RequestModel from "./request.model";

export const createRequest = async (data: object) => {
  const request = new RequestModel(data);
  return await request.save();
};

export const getAllRequests = async () => {
  return await RequestModel.find({});
};

export const getRequestById = async (id: string | number) => {
  return await RequestModel.findById(id);
};

export const updateRequest = async (id: string | number, data: object) => {
  return await RequestModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteRequest = async (id: string | number) => {
  return await RequestModel.findByIdAndDelete(id);
};
