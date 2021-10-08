import {
  collection,
  getDoc,
  getDocs,
  QuerySnapshot,
  doc,
  setDoc,
  updateDoc,
  Timestamp
} from "firebase/firestore";
import { fireStoreDB } from "../fireconfig_v9";

import {
  Project,
  SendData,
  ProjectStatus,
  getQueryObject
} from "../types/Types";
import { PrjInput } from "../app";

export class ProjectState {
  private static instance: ProjectState;

  projectContainer: Project[] = [];
  ListenerFunctions: Function[] = [];
  queryObj: getQueryObject = {};

  constructor() {
    this.getQuery();
    this.initDB();
  }

  static getInstance() {
    if (!this.instance) {
      return (this.instance = new ProjectState());
    }
    return this.instance;
  }

  getQuery() {
    const queryString: string[] = location.search.substring(1).split("&");
    // console.log(queryString);

    if (queryString[0] !== "") {
      for (const qryStr of queryString) {
        const kv = qryStr.split("=");
        this.queryObj[kv[0]] = kv[1];
      }
      // console.log('getQuery', this.queryObj);
    }
    // アドレスバー書き換え
    // history.replaceState("", "", "./firetest.html");
  }

  async initDB() {
    const querySnapshot = await getDocs(collection(fireStoreDB, "project"));
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

  async addProject(sendData: SendData, imgCheck?: boolean) {
    const newProjectRef = doc(collection(fireStoreDB, "project"));

    const projectDoc = {
      id: newProjectRef.id,
      title: sendData.title,
      description: sendData.description,
      manday: sendData.manday,
      regions: Timestamp.fromDate(new Date()),
      status: sendData.status
    };

    await setDoc(newProjectRef, projectDoc);
    // console.log("addProject projectDoc:", projectDoc);

    const newProject = new Project(
      projectDoc.id,
      sendData.title,
      sendData.description,
      sendData.manday,
      sendData.status,
      projectDoc.regions
    );

    this.projectContainer.push(newProject);
    this.updateListeners();
    return;
  }

  delProject(projectId: String) {
    console.log("delProject:");
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

  async moveProject(projectId: string, listType: "active" | "finished") {
    const findProject = this.projectContainer.find((project) => {
      if (project.id === projectId) {
        return project;
      }
    });

    if (findProject) {
      findProject.state =
        listType === "active" ? ProjectStatus.Active : ProjectStatus.Finished;
    }

    const updateRef = doc(fireStoreDB, "project", projectId);
    await updateDoc(updateRef, {
      status:
        listType === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    });

    this.updateListeners();
    // console.log('moveProject:', findProject);
    return;
  }
}
