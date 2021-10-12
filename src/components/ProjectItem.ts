import { Timestamp } from "firebase/firestore";
// import { fireStoreDB } from "../fireconfig_v9";
import { firebaseStorage } from "../fireStorageConfig";

// import { collection, getDoc, getDocs, QuerySnapshot } from "firebase/firestore";
import "firebase/compat/storage";

import { Project } from "../types/Types";
import { Draggable } from "../types/DragTypes";

import { prjState } from "../app";

export class ProjectItem implements Draggable {
  baseElements: HTMLTemplateElement;
  outputElements: HTMLUListElement;
  editElements: HTMLLIElement;

  getProject: Project;

  constructor(public listType: string, project: Project) {
    this.baseElements = document.getElementById(
      "single-project"
    )! as HTMLTemplateElement;
    this.outputElements = document.getElementById(
      `${listType}-projects-list`
    )! as HTMLUListElement;

    const editEl = document.importNode(this.baseElements.content, true);
    this.editElements = editEl.firstElementChild! as HTMLLIElement;
    this.editElements.draggable = true;
    this.editElements.id = project.id;

    this.getProject = project;

    // console.log("ProjectItem:", this.editElements);

    this.configure();
    this.renderContent();
    this.attach();
  }

  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.getProject.id);
    event.dataTransfer!.dropEffect = "move";
    // console.log("dragStart");
  }

  dragEndHandler(event: DragEvent): void {
    event.preventDefault();
    // console.log("dragEnd", dragData);
  }

  configure() {
    this.editElements.addEventListener(
      "dragstart",
      this.dragStartHandler.bind(this)
    );
    this.editElements.addEventListener(
      "dragend",
      this.dragEndHandler.bind(this)
    );
  }

  async renderContent() {
    const addH2 = document.createElement("h2");
    const addH3 = document.createElement("h3");
    const addP1 = document.createElement("p");
    const addP2 = document.createElement("p");
    const addImg = document.createElement("img");
    const addBtn = document.createElement("button");
    const addAnk = document.createElement("a");

    addH3.textContent = this.getProject.description;
    addP1.textContent =
      "manday:" +
      this.getProject.manday.toString() +
      "/ id:" +
      this.getProject.id +
      "/ regions:" +
      new Date(this.getProject.regions.seconds);

    addP2.textContent = this.getProject.manday.toString();

    addAnk.href = `?id=${this.getProject.id}&title=${this.getProject.title}`;
    addAnk.textContent = this.getProject.title;
    addH2.appendChild(addAnk);

    addBtn.textContent = "削除する";
    addBtn.onclick = async () => {
      await prjState.delProject(this.getProject.id);
      // console.log(newBtn, this.project.id);
    };

    /* */
    const imagesRef = firebaseStorage
      .ref()
      .child(`image/${this.getProject.id}`);
    imagesRef
      .getDownloadURL()
      .then((url) => {
        addImg.setAttribute("src", url);
      })
      .catch((error) => {
        console.error("Error printImg document: ", error);
      });

    await imagesRef
      .getMetadata()
      .then(function (metadata) {
        // console.log('getMetadata', metadata);
        addP2.textContent = `${metadata.contentType} ${metadata.size}`;
        addImg.alt = metadata.contentType!.toString();
      })
      .catch(function (error) {
        console.error("Error getMetadata document: ", error);
      });

    this.editElements.appendChild(addH2);
    this.editElements.appendChild(addH3);
    this.editElements.appendChild(addP1);
    this.editElements.appendChild(addP2);
    this.editElements.appendChild(addImg);
    this.editElements.appendChild(addBtn);
  }

  attach() {
    this.outputElements.insertAdjacentElement("afterbegin", this.editElements);
  }
}
