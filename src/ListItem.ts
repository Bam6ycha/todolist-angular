export class ListItem {
  public element: HTMLUListElement;

  constructor() {
    this.element = this.creatUnOrderedList();
    document.body.prepend(this.element);
  }

  private creatUnOrderedList() {
    return document.createElement("ul");
  }

  public createListItem(value: string) {
    const liItem = document.createElement("li");
    liItem.textContent = value;
    liItem.style.cursor = "pointer";
    liItem.style.listStyleType = "none";
    this.element.prepend(liItem);
  }
}
