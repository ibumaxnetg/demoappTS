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
    public regions: Date
  ) {}
}

export enum ProjectStatus {
  Active,
  Finished
}
