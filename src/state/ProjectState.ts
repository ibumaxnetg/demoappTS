import { Project, ProjectStatus } from "../types/Types";

export class ProjectState {
  private static instance: ProjectState;

  projectContainer: Project[] = [];
  ListenerFunctions: Function[] = [];

  constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProjectState();
    }
    return this.instance;
  }

  private addProject(
    id: string,
    title: string,
    description: string,
    manday: number,
    imgFile: File | null,
    imgCheck: boolean
  ) {
    const newProject = new Project(
      id,
      title,
      description,
      manday,
      ProjectStatus.Active,
      new Date()
    );
    this.projectContainer.push(newProject);
    this.updateListeners();
  }

  addListener(listenerFn: Function) {
    this.ListenerFunctions.push(listenerFn);
    // console.log("ProjectState addListener:", this.ListenerFunctions);
  }

  private updateListeners() {
    for (const listener of this.ListenerFunctions) {
      listener(this.projectContainer.slice());
      // console.log("ProjectState updateListeners:", this.ListenerFunctions);
    }
  }
}

export const prjState = ProjectState.getInstance();
