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

  addProject(
    id: string,
    title: string,
    description: string,
    manday: number,
    imgFile?: File | null,
    imgCheck?: boolean
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
    }
    // console.log('updateListeners:', this.ListenerFunctions);
  }

  moveProject(projectId: string, listType: 'active' | 'finished') {
    const findProject = this.projectContainer.find((project) => {
      if (project.id === projectId) {
        return project;
      }
      return;
    });

    if (findProject) {
      findProject.state = listType === 'active' ? ProjectStatus.Active: ProjectStatus.Finished;
    }
    this.updateListeners();
    // console.log('moveProject:', findProject);
    return;
  }
}

export const prjState = ProjectState.getInstance();
