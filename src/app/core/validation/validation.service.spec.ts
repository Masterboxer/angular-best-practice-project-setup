import { TestBed } from "@angular/core/testing";
import { FormControl } from "@angular/forms";
import { ValidationService } from "./validation.service";

describe("ValidationService", () => {
  let service: ValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationService);
  });

  it("should return null if control has value", () => {
    const control = new FormControl("test value");
    const result = ValidationService.required(control);
    expect(result).toBeNull();
  });

  it("should return error object if control has no value", () => {
    const control = new FormControl("");
    const result = ValidationService.required(control);
    expect(result).toEqual({
      required: true,
      errorMessage: "This field is required"
    });
  });

  it("should return error object if control value is null", () => {
    const control = new FormControl(null);
    const result = ValidationService.required(control);
    expect(result).toEqual({
      required: true,
      errorMessage: "This field is required"
    });
  });

  it("should return error object if control value is undefined", () => {
    const control = new FormControl(undefined);
    const result = ValidationService.required(control);
    expect(result).toEqual({
      required: true,
      errorMessage: "This field is required"
    });
  });
});
