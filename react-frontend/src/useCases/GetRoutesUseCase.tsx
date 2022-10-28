import { IRoutesService } from "../interfaces/IRoutesService";
import { IRoute } from "../models/IRoute";

const GetRoutesUseCase = async (deviceService: IRoutesService): Promise<IRoute[]> => {
    const response = await deviceService.getRoutes();
    return response;
}

export default GetRoutesUseCase;