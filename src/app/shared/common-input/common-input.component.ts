import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  Injector,
  OnInit
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule
} from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-common-input",
  templateUrl: "./common-input.component.html",
  styleUrls: ["./common-input.component.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CommonInputComponent),
      multi: true
    }
  ]
})
export class CommonInputComponent implements ControlValueAccessor, OnInit {
  @Input() isFieldRequired = true;
  @Input({ required: true }) placeholder = "Sample Placeholder";
  @Input() type = "text";
  @Input() control: NgControl | undefined;
  @Input() inputId: string | undefined;
  @Input() isCalculator = false;
  @Input() isNumberOnly = false;
  @Input() numberType: "numeric" | "decimal" = "numeric";
  @Input() maxLength: number | undefined;
  @Input() minLength: number | undefined;
  @Input() customMask = "";
  @Input() readOnly = false;

  @Output() inputEvent = new EventEmitter<HTMLInputElement>();
  @Output() inputFocusEvent = new EventEmitter<HTMLInputElement>();
  @Output() inputFocusOutEvent = new EventEmitter<HTMLInputElement>();

  inputValue = new FormControl("");
  isEyeOpen = false;

  onTouched: (event?: Event) => void = () => {};

  constructor(private injector: Injector) {}

  ngOnInit() {
    this.control = this.injector.get(NgControl);
  }

  writeValue(input: string): void {
    this.inputValue.setValue(input);
  }

  registerOnChange(fn: () => void): void {
    this.inputValue.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: (event?: Event) => void): void {
    this.onTouched = fn;
  }

  triggerPasswordVisibility() {
    this.isEyeOpen = !this.isEyeOpen;
    if (this.isEyeOpen) {
      this.type = "text";
    } else {
      this.type = "password";
    }
  }

  /**
   * @description Handles the focus event of an input element.
   * @param {HTMLInputElement} commonInput - The HTML input element that triggered the focus event.
   */
  onFocus(commonInput: HTMLInputElement) {
    this.inputFocusEvent.emit(commonInput);
  }

  /**
   * @description Handles the focus out event of an input element.
   * @param {HTMLInputElement} commonInput - The HTML input element that triggered the focus event.
   */
  onFocusOut(commonInput: HTMLInputElement) {
    this.inputFocusOutEvent.emit(commonInput);
  }

  /**
   * @description Handles the input event of an input element.
   * @param {HTMLInputElement} commonInput - The HTML input element that triggered the input event.
   */
  onInput(commonInput: HTMLInputElement) {
    this.inputEvent.emit(commonInput);
  }
}
