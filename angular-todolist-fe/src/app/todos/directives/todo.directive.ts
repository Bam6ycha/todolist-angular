import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[textDecorationLineThrough]',
})
export class TodoDirective implements OnChanges {
  @Input('isCompleted') isCompletedProps: boolean = false;

  constructor(private elementRef: ElementRef<HTMLLIElement>) {}

  ngOnChanges(): void {
    this.changeText();
  }

  changeText() {
    if (this.isCompletedProps) {
      this.elementRef.nativeElement.style.textDecoration = 'line-through';
    } else {
      this.elementRef.nativeElement.style.textDecoration = '';
    }
  }
}
