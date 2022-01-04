import { data } from "./data";
import { ListItem } from "./ListItem";

export class UserInput {
  public element: HTMLInputElement;

  private listItems: ListItem;

  constructor() {
    this.element = this.createInputElemetn();
    this.listItems = new ListItem();
    this.OnInput();
  }

  private createInputElemetn() {
    return document.createElement("input");
  }

  private OnInput() {}
}
