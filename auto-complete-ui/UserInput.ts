import { data } from "./data";
import { UnOrderedList } from "./UnOrderedList";
import { createAutoComplete } from "../auto-complete/index.js";

const autoComplete = createAutoComplete(data) as (prefix: string) => string[];

export class UserInput {
  public element: HTMLInputElement;

  private unOrneredList: UnOrderedList;

  constructor() {
    this.element = this.createInputElemetn();
    this.unOrneredList = new UnOrderedList();
    this.onInput();
    this.changeValue();
  }

  private createInputElemetn(): HTMLInputElement {
    return document.createElement("input");
  }

  private changeValue(): void {
    this.unOrneredList.onClick(this.element);
  }

  private getInputValue(): string {
    return this.element.value;
  }

  private onInput(): void {
    const UnOrderedList = this.unOrneredList.element;

    this.element.oninput = () => {
      const countOfRednerElements = 60;
      let nextCountOfRenderElements = countOfRednerElements;
      let previousCountOfRenderElements = countOfRednerElements;

      const values = autoComplete(this.getInputValue());
      const result = values.map(
        (value) => `<li style="cursor: pointer;list-style: none;">${value}</li>`
      );

      UnOrderedList.innerHTML = result.slice(0, countOfRednerElements).join("");

      window.onscroll = function infiniteScroll() {
        if (nextCountOfRenderElements <= result.length) {
          const windowRelativeBottom =
            document.documentElement.getBoundingClientRect().bottom;

          if (
            windowRelativeBottom <
            document.documentElement.clientHeight + 100
          ) {
            nextCountOfRenderElements += 60;

            UnOrderedList.innerHTML += result
              .slice(previousCountOfRenderElements, nextCountOfRenderElements)
              .join("");

            previousCountOfRenderElements += 60;
          }
        } else {
          window.onscroll = null;
        }
      };
    };
  }
}
