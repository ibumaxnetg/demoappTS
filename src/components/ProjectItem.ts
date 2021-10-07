import { firebaseStoreDB } from "../fireconfig_v9";
import { firebaseStorage } from "../fireconfig_v8";

import { collection, getDoc, getDocs, QuerySnapshot } from "firebase/firestore";
import { ref } from "firebase/storage";

import { Project } from "../types/Types";
import { Draggable } from "../types/DragTypes";

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

  renderContent() {
    const pathReference = firebaseStorage.ref.child(`image/${this.getProject}`);
    pathReference
      .child("images/stars.jpg")
      .getDownloadURL()
      .then(function (url) {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function (event) {
          var blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();

        // Or inserted into an <img> element:
        var img = document.getElementById("myimg");
        img.src = url;
      })
      .catch(function (error) {
        // Handle any errors
      });

    const addH2 = document.createElement("h2");
    const addP1 = document.createElement("p");
    const addP2 = document.createElement("p");
    const addP3 = document.createElement("p");

    addH2.textContent = this.getProject.title;
    addP1.textContent = this.getProject.description;
    addP2.textContent = this.getProject.manday.toString();
    addP3.textContent = "regions:" + this.getProject.regions;

    this.editElements.appendChild(addH2);
    this.editElements.appendChild(addP1);
    this.editElements.appendChild(addP2);
    this.editElements.appendChild(addP3);
  }

  attach() {
    this.outputElements.insertAdjacentElement("afterbegin", this.editElements);
  }
}
