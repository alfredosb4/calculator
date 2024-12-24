import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, OnInit, output, signal, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  styleUrl: './calculator-button.component.css',
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host:{
    class: 'w-1/4 border-r border-b border-indigo-400'
  },
  // encapsulation: ViewEncapsulation.None,
})
export class CalculatorButtonComponent  {

  public isPressed = signal( false )
  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  public isCommand = input( false, {
    transform: ( value: boolean | string ) => typeof value === 'string' ? value === '' : value
  });
  public isDoubleSize = input( false, {
    transform: ( value: boolean | string ) => typeof value === 'string' ? value === '' : value
  });



  // @HostBinding('class.is-command') get commandStyle() {
  //   return this.isCommand();
  // }

  @HostBinding('class.w-2/4') get commandStyle() {
    return this.isDoubleSize();
  }

  handleClick(){
    if( !this.contentValue()?.nativeElement )
      return;

    const valor = this.contentValue()?.nativeElement.innerText;
    this.onClick.emit( valor!.trim() )
  }

  public keyBoardPressedStyle( key: string ){
    if( !this.contentValue() ) return;

    const valor = this.contentValue()?.nativeElement.innerText;
    if( valor !== key ) return;

    this.isPressed.set( true );

    setTimeout(() => {
      this.isPressed.set( false );
    }, 100);
  }


}
