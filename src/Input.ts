import { autocomplete } from "./autocomplite";
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

  private OnInput() {
    this.element.addEventListener("input", (event: InputEvent) => {
      if (this.listItems.element) {
        const children = [...this.listItems.element.children];
        children.forEach((item: HTMLLIElement) => item.remove());
      }
      const { target } = event;
      if (target) {
        const value = this.element.value;
        const result = autocomplete(data, value);
        result.forEach((item: string) => {
          this.listItems.createListItem(item, () => {
            this.element.value = item;
          });
        });
      }
    });
  }
}
