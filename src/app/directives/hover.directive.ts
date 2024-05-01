import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {



  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('#0b5ed7');
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.color = color;
  }
  constructor(private el: ElementRef) {
  }

}
