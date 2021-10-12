import { Timestamp } from "firebase/firestore";

export interface UserInputData {
  title: string;
  description: string;
  manday: number;
  imgFile?: File | null | undefined;
  imgCheck?: boolean;
}

export class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public manday: number,
    public status: ProjectStatus,
    public regions: Timestamp
  ) {}
}

export interface SendData {
  title: string;
  description: string;
  manday: number;
  id?: string;
  imgFile?: File;
  status?: ProjectStatus | undefined;
  regions?: Timestamp;
}

export enum ProjectStatus {
  Active,
  Finished
}

export interface getQueryObject {
  [key: string]: string;
}
