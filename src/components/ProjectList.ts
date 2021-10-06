import { Project, ProjectStatus } from "../types/Types";
import { DragTarget } from "../types/DragTypes";
import { ProjectItem } from "../components/ProjectItem";

import { prjState } from "../app";

export class ProjectList implements DragTarget {
  baseElements: HTMLTemplateElement;
  outputElements: HTMLDivElement;
  editElements: HTMLElement;

  assignedProjects: Project[];

  constructor(private listType: string) {
    this.baseElements = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.outputElements = document.getElementById("app")! as HTMLDivElement;

    const editElements = document.importNode(this.baseElements.content, true);
    this.editElements = editElements.firstElementChild! as HTMLElement;
    this.editElements.id = `${listType}-projects`;

    this.assignedProjects = [];

    this.configure();
    this.renderContent();
    this.attach();
  }

  configure() {
    prjState.addListener((project: Project[]) => {
      const tmpProjects = prjState.projectContainer.filter((project) => {
        if (this.listType === "active") {
          return project.state === ProjectStatus.Active;
        }
        if (this.listType === "finished") {
          return project.state === ProjectStatus.Finished;
        }
      });

      this.assignedProjects = tmpProjects;
      this.renderProjects();
    });

    this.editElements.addEventListener(
      "dragover",
      this.dragOverHandler.bind(this)
    );
    this.editElements.addEventListener(
      "dragleave",
      this.dragLeaveHandler.bind(this)
    );
    this.editElements.addEventListener("drop", this.dropHandler.bind(this));
  }

  dragOverHandler(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      const overEl = this.editElements.querySelector("ul")!;
      overEl.classList.add("droppable");
      // console.log(event.dataTransfer);
    }
  }

  dropHandler(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      const dropEl = this.editElements.querySelector("ul")!;
      dropEl.classList.remove("droppable");
      const dragData: string = event.dataTransfer!.getData("text/plain");
      // console.log("drop", dragData);
      prjState.moveProject(dragData, this.listType);
    }
  }

  dragLeaveHandler(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      const leaveEl = this.editElements.querySelector("ul")!;
      leaveEl.classList.remove("droppable");
    }
  }

  renderContent() {
    const headerCont = this.editElements.querySelector("h2")!;
    const ulListEl = this.editElements.querySelector("ul")!;
    headerCont.textContent =
      this.listType === "active" ? "稼働中プロジェクト" : "終了プロジェクト";
    ulListEl.id = `${this.listType}-projects-list`;
  }

  renderProjects() {
    const ulEl = document.querySelector(`#${this.listType}-projects-list`)!;
    ulEl.innerHTML = "";

    this.assignedProjects.forEach((project) => {
      new ProjectItem(this.listType, project);
    });
  }

  attach() {
    this.outputElements.insertAdjacentElement("beforeend", this.editElements);
  }
}
