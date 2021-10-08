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
    public state: ProjectStatus,
    public regions: string
  ) {}
}

export interface SendData {
  title: string;
  description: string;
  manday: number;
  id?: string;
  imgFile?: File;
  status?: ProjectStatus | undefined;
  regions?: string;
}

export enum ProjectStatus {
  Active,
  Finished
}

export interface getQueryObject {
  [key: string]: string;
}
