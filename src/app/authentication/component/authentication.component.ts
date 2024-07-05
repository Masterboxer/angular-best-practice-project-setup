import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonInputComponent } from "../../shared/common-input/common-input.component";
import { CommonButtonComponent } from "../../shared/common-button/common-button.component";
import { ILoginForm } from "../interfaces/authentication.model";
import { ValidationService } from "../../core/validation/validation.service";

@Component({
  selector: "app-authentication",
  standalone: true,
  imports: [CommonInputComponent, CommonButtonComponent, ReactiveFormsModule],
  templateUrl: "./authentication.component.html",
  styleUrl: "./authentication.component.scss"
})
export class AuthenticationComponent {
  authenticationForm = new FormGroup<ILoginForm>({
    username: new FormControl("", {
      nonNullable: true,
      validators: ValidationService.required
    }),
    password: new FormControl("", {
      nonNullable: true,
      validators: ValidationService.required
    })
  });
}
