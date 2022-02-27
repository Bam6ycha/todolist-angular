import { data } from './data';
import { UnOrderedList } from './UnOrderedList';
import { createAutoComplete } from '../auto-complete/index.js';

const autoComplete = createAutoComplete(data) as (prefix: string) => string[];

export class UserInput {
  public element: HTMLInputElement;

  private unOrderedList: UnOrderedList;

  constructor() {
    this.element = this.createInputElement();
    this.unOrderedList = new UnOrderedList();
    this.onInput();
    this.changeValue();
  }

  private createInputElement(): HTMLInputElement {
    return document.createElement('input');
  }

  private changeValue(): void {
    this.unOrderedList.onClick(this.element);
  }

  private getInputValue(): string {
    return this.element.value;
  }

  private onInput(): void {
    const UnOrderedList = this.unOrderedList.element;

    this.element.oninput = () => {
      const countOfRenderElements = 60;
      let nextCountOfRenderElements = countOfRenderElements;
      let previousCountOfRenderElements = countOfRenderElements;

      const values = autoComplete(this.getInputValue());
      const result = values.map(
        (value) =>
          `<li style="cursor: pointer;list-style: none;">${value}</li>`,
      );

      UnOrderedList.innerHTML = result.slice(0, countOfRenderElements).join('');

      window.onscroll = function infiniteScroll() {
        if (nextCountOfRenderElements <= result.length) {
          const windowRelativeBottom =
            document.documentElement.getBoundingClientRect().bottom;

          if (
            windowRelativeBottom <
            document.documentElement.clientHeight + 100
          ) {
            nextCountOfRenderElements += countOfRenderElements;

            UnOrderedList.innerHTML += result
              .slice(previousCountOfRenderElements, nextCountOfRenderElements)
              .join('');

            previousCountOfRenderElements += countOfRenderElements;
          }
        } else {
          window.onscroll = null;
        }
      };
    };
  }
}
