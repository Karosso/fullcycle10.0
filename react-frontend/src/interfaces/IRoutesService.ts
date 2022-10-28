import { IRoute } from "../models/IRoute";

export interface IRoutesService {
  getRoutes: () => Promise<IRoute[]>;
}