import { Project } from "../types/Types";

export class ProjectItem {
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

    this.getProject = project;

    console.log("ProjectItem:", this.editElements);

    this.renderContent();
    this.attach();
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
