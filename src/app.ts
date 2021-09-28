interface UserInputData {
  title: string;
  description: string;
  manday: number;
  img?: File;
  imgCheck?: boolean;
}

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
    const inputImgFile = this.inputImgElem.files;
    const inputImgDelChk = this.inputImgDelElem.checked;

    const useInputData: UserInputData = {
      title: inputTtlTex,
      description: inputDescTex,
      manday: +inputMDTex,
      img: inputImgFile,
      imgCheck: inputImgDelChk ? inputImgDelChk : false
    };
    console.log("はいクリック", useInputData);
    this.clearInput();
  }

  attach() {
    this.outputElements.insertAdjacentElement("afterbegin", this.editElements);
  }

  clearInput() {
    this.inputTtlElem.value = "";
    this.inputDescElem.value = "";
    this.inputMDElem.value = "";
    this.inputImgElem.files = null;
    this.inputImgDelElem.checked = false;
  }
}

class ProjectList {}

// const prjState = new ProjectState();
// new ProjectList('active');
// new ProjectList('finished');

const PrjInput = new ProjectInput();
