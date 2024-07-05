import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class ValidationService {
  static required(control: AbstractControl): { [key: string]: unknown } | null {
    if (!control.value || control.value.length === 0) {
      return { required: true, errorMessage: "This field is required" };
    }
    return null;
  }
}
