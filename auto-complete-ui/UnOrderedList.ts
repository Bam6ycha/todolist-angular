export class UnOrderedList {
  public element: HTMLUListElement;

  constructor() {
    this.element = this.creatUnOrderedList();
    this.addUnOrderedListToDOM();
  }

  private addUnOrderedListToDOM(): void {
    document.body.prepend(this.element);
  }

  private creatUnOrderedList(): HTMLUListElement {
    return document.createElement("ul");
  }

  public onClick(element: HTMLInputElement): void {
    this.element.onclick = (event: MouseEvent) => {
      const target = event.target as HTMLLIElement;
      if (target.tagName !== "LI") {
        return;
      }

      element.value = target.textContent ?? "";
    };
  }
}
