import { UserInput } from "./Input";

class AutocompleteUI {
  public element: HTMLDivElement;
  private input: UserInput;

  constructor() {
    this.element = document.createElement("div");
    this.input = new UserInput();
    this.element.prepend(this.input.element);
  }
}

const autocomplete = new AutocompleteUI();

document.body.prepend(autocomplete.element);
