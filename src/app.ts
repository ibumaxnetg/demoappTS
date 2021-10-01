import { ProjectState } from "./state/ProjectState";
import { ProjectInput } from "./components/ProjectInput";
import { ProjectList } from "./components/ProjectList";

const PrjInput = new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
