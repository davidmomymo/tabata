import {Component, forwardRef, inject, Input, OnInit} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-settings-field',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './settings-field.component.html',
  styleUrl: './settings-field.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => SettingsFieldComponent)
  }]
})
export class SettingsFieldComponent implements ControlValueAccessor, OnInit {
  @Input() formControlName!: string;

  private controlContainer = inject(ControlContainer, { optional: true });

  formControl!: FormControl<string>;


  ngOnInit(): void {
    if (this.formControlName && this.controlContainer) {
      this.formControl = (this.controlContainer.control?.get(this.formControlName) as FormControl<string>) ?? null;
    }
  }


  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }
}
