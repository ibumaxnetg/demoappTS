import { UserInputData, ProjectStatus } from "../types/Types";
import { prjState } from "../app";
import { rundStrCreate } from "../util/Util";

import { Project, SendData } from "../types/Types";

export class ProjectInput {
  baseElements: HTMLTemplateElement;
  outputElements: HTMLDivElement;
  editElements: HTMLFormElement;

  inputTtlElem: HTMLInputElement;
  inputDescElem: HTMLInputElement;
  inputMDElem: HTMLInputElement;
  inputImgElem: HTMLInputElement;
  inputImgDelElem: HTMLInputElement;

  sendProjectId: string;
  sendProjectStatus: ProjectStatus;
  sendProjectRegions: Date | undefined;

  constructor() {
    this.baseElements = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.outputElements = document.getElementById("app")! as HTMLDivElement;

    const editNode = document.importNode(this.baseElements.content, true)!;
    this.editElements = editNode.firstElementChild as HTMLFormElement;
    this.editElements.id = "user-input";

    this.inputTtlElem = this.editElements.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.inputDescElem = this.editElements.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.inputMDElem = this.editElements.querySelector(
      "#manday"
    )! as HTMLInputElement;
    this.inputImgElem = this.editElements.querySelector(
      "#photo"
    )! as HTMLInputElement;
    this.inputImgDelElem = this.editElements.querySelector(
      "#photodel"
    )! as HTMLInputElement;

    this.configure();
    this.attach();
  }

  configure() {
    this.editElements.addEventListener("submit", this.submitHandler.bind(this));
  }

  submitHandler(event: Event) {
    event.preventDefault();

    this.sendProjectId = rundStrCreate(12);
    this.sendProjectStatus = ProjectStatus.Active;
    this.sendProjectRegions = undefined;

    const inputTtlTex = this.inputTtlElem.value;
    const inputDescTex = this.inputDescElem.value;
    const inputMDTex = this.inputMDElem.value;
    const inputImgFile = this.inputImgElem.files
      ? this.inputImgElem.files[0]
      : undefined;
    const inputImgDelChk = this.inputImgDelElem.checked;

    const sendData: SendData = {
      title: inputTtlTex,
      description: inputDescTex,
      manday: +inputMDTex,
      id: this.sendProjectId,
      imgFile: inputImgFile,
      status: this.sendProjectStatus,
      regions: this.sendProjectRegions
    };

    if (inputTtlTex && inputDescTex && inputMDTex) {
      prjState.addProject(sendData, inputImgDelChk ? inputImgDelChk : false);
      // console.log("ProjectInput:", prjState.projectContainer);

      this.clearInput();
    } else {
      alert("入力が正しくありません");
    }
  }

  attach() {
    this.outputElements.insertAdjacentElement("afterbegin", this.editElements);
  }

  clearInput() {
    this.inputTtlElem.value = "";
    this.inputDescElem.value = "";
    this.inputMDElem.value = "";
    this.inputImgElem.value = "";
    this.inputImgDelElem.checked = false;
  }

  async renderContent(newProject: Project) {
    this.inputTtlElem.value = newProject.title;
    this.inputDescElem.value = newProject.description;
    this.inputMDElem.value = newProject.manday.toString();
    this.sendProjectId = newProject.id;
    this.sendProjectStatus = newProject.status;
    this.sendProjectRegions = newProject.regions;
    // console.log('ProjectInput renderContent Project:', this.sendProjectId, '/', this.sendProjectStatus, '/', this.sendProjectRegions);
  }
}
