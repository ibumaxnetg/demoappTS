import { firebaseStoreDB, firebaseStorege } from "../fireconfig_v9";
import { collection, getDoc, getDocs, QuerySnapshot } from "firebase/firestore";
import { storage } from "firebase/storage";

import { Project, ProjectStatus, getQueryObject } from "../types/Types";
import { PrjInput } from "../app";

export class ProjectState {
  private static instance: ProjectState;

  projectContainer: Project[] = [];
  ListenerFunctions: Function[] = [];
  queryObj: getQueryObject = {};

  constructor() {
    this.initDB();
  }

  static getInstance() {
    if (!this.instance) {
      return (this.instance = new ProjectState());
    }
    return this.instance;
  }

  async initDB() {
    const querySnapshot = await getDocs(collection(firebaseStoreDB, "project"));
    querySnapshot.forEach(async (doc) => {
      const docData = doc.data();
      const docStatus =
        docData.status === 0 ? ProjectStatus.Active : ProjectStatus.Finished;
      const newProject = new Project(
        docData.id,
        docData.title,
        docData.description,
        docData.manday,
        docStatus,
        docData.regions
      );
      // console.log(`${doc.id} => ${doc.data()}`, docData);
      await this.projectContainer.push(newProject);
      if (newProject.id === this.queryObj.id) {
        await PrjInput.renderContent(newProject);
      }
    });
    await this.updateListeners();
    // console.log(this.projectContainer);
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

  updateListeners() {
    for (const listener of this.ListenerFunctions) {
      listener(this.projectContainer.slice());
    }
    // console.log('updateListeners:', this.ListenerFunctions);
  }

  moveProject(projectId: string, listType: "active" | "finished") {
    const findProject = this.projectContainer.find((project) => {
      if (project.id === projectId) {
        return project;
      }
    });

    if (findProject) {
      findProject.state =
        listType === "active" ? ProjectStatus.Active : ProjectStatus.Finished;
    }
    this.updateListeners();
    // console.log('moveProject:', findProject);
    return;
  }
}
