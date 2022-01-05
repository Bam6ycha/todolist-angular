import { UserInput } from "./UserInput";

class AutocompleteUI {
  public element: HTMLDivElement;
  private input: UserInput;

  constructor() {
    this.element = this.createContainer();
    this.input = new UserInput();
    this.element.prepend(this.input.element);
  }

  private createContainer(): HTMLDivElement {
    return document.createElement("div");
  }
}

const autocomplete = new AutocompleteUI();

document.body.prepend(autocomplete.element);
