import { UserInputData } from "./components/DataTypes";

class ProjectState {}

class ProjectInput {
  baseElements: HTMLTemplateElement;
  outputElements: HTMLDivElement;
  editElements: HTMLFormElement;

  inputTtlElem: HTMLInputElement;
  inputDescElem: HTMLInputElement;
  inputMDElem: HTMLInputElement;
  inputImgElem: HTMLInputElement;
  inputImgDelElem: HTMLInputElement;

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
    const inputTtlTex = this.inputTtlElem.value;
    const inputDescTex = this.inputDescElem.value;
    const inputMDTex = this.inputMDElem.value;
    const inputImgFile = this.inputImgElem.files
      ? this.inputImgElem.files[0]
      : undefined;
    const inputImgDelChk = this.inputImgDelElem.checked;

    const useInputData: UserInputData = {
      title: inputTtlTex,
      description: inputDescTex,
      manday: +inputMDTex,
      imgFile: inputImgFile,
      imgCheck: inputImgDelChk ? inputImgDelChk : false
    };

    if (inputTtlTex && inputDescTex && inputMDTex) {
      console.log("はいクリック", useInputData);
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
}

class ProjectList {
  baseElements: HTMLTemplateElement;
  outputElements: HTMLDivElement;
  editElements: HTMLElement;

  constructor(public listType: string) {
    this.baseElements = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.outputElements = document.getElementById("app")! as HTMLDivElement;

    const editElements = document.importNode(this.baseElements.content, true);
    this.editElements = editElements.firstElementChild! as HTMLElement;
    this.editElements.id = `${listType}-projects`;

    console.log(this.editElements);
    this.renderContent();
    this.attach();
  }

  renderContent() {
    const headerCont = this.editElements.querySelector("h2")!;
    headerCont.textContent =
      this.listType === "active" ? "稼働中プロジェクト" : "終了プロジェクト";
  }

  attach() {
    this.outputElements.insertAdjacentElement("beforeend", this.editElements);
  }
}

// const prjState = new ProjectState();
new ProjectList("active");
new ProjectList("finished");

const PrjInput = new ProjectInput();
