import express from "express";
import requestRoutes from "../files/Request/request.routes";

const useRoutes = (app: express.Application) => {
  const base = `/api/v1`;
  app.use(`${base}/requests`, requestRoutes);
};

export default useRoutes;
