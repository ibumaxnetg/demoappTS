import { Project, ProjectStatus } from "../types/Types";
import { prjState } from "../state/ProjectState";
import { ProjectItem } from "../components/ProjectItem";

export class ProjectList {
  baseElements: HTMLTemplateElement;
  outputElements: HTMLDivElement;
  editElements: HTMLElement;

  assignedProjects: Project[];

  constructor(public listType: string) {
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
      console.log(tmpProjects);
      this.assignedProjects = tmpProjects;
      this.renderProjects();
    });
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
