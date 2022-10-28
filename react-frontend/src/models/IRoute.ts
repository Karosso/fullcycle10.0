import { IPosition } from "./IPosition";

export interface IRoute { 
  _id: string;
  title: string;
  startPosition: IPosition;
  endPosition: IPosition;
}