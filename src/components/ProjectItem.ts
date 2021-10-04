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
    const addH2 = document.createElement("h2");
    const addP1 = document.createElement("p");
    const addP2 = document.createElement("p");

    addH2.textContent = this.getProject.title;
    addP1.textContent = this.getProject.description;
    addP2.textContent = this.getProject.manday.toString();

    this.editElements.appendChild(addH2);
    this.editElements.appendChild(addP1);
    this.editElements.appendChild(addP2);
  }

  attach() {
    this.outputElements.insertAdjacentElement("afterbegin", this.editElements);
  }
}
