import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule, FormsModule, NgControl } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { CommonInputComponent } from "./common-input.component";
import { Injector, EventEmitter } from "@angular/core";
import { of } from "rxjs";

describe("CommonInputComponent", () => {
  let component: CommonInputComponent;
  let fixture: ComponentFixture<CommonInputComponent>;
  let mockInjector: Partial<Injector>;
  let ngControlStub = {};

  beforeEach(async () => {
    mockInjector = {
      get: jest.fn().mockReturnValue({ valueChanges: of() })
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
      providers: [
        { provide: Injector, useValue: mockInjector },
        { provide: NgControl, useValue: {} }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should inject NgControl on ngOnInit", () => {
    component.ngOnInit();
    expect(component.control).toStrictEqual(ngControlStub as NgControl);
  });

  it("should write value", () => {
    const input = "test";
    component.writeValue(input);
    expect(component.inputValue.value).toBe(input);
  });

  it("should register onChange", () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    component.inputValue.setValue("test");
    expect(fn).toHaveBeenCalled();
  });

  it("should call onTouched method", () => {
    const mockEvent: Event = {} as Event;
    let touchedCalled = false;
    component.onTouched(mockEvent);
    touchedCalled = true;
    expect(touchedCalled).toBeTruthy();
  });

  it("should call the registered onTouched function when invoked", () => {
    const mockFn = jest.fn();
    component.registerOnTouched(mockFn);
    component.onTouched();

    expect(mockFn).toHaveBeenCalled();
  });

  it("should call the registered onTouched function with an event when invoked with an event", () => {
    const mockFn = jest.fn();
    component.registerOnTouched(mockFn);
    const event = new Event("click");
    component.onTouched(event);

    expect(mockFn).toHaveBeenCalledWith(event);
  });

  it("should toggle password visibility", () => {
    component.isEyeOpen = false;
    component.type = "password";
    component.triggerPasswordVisibility();
    expect(component.isEyeOpen).toBe(true);
    expect(component.type).toBe("text");
    component.isEyeOpen = true;
    component.type = "text";
    component.triggerPasswordVisibility();
    expect(component.isEyeOpen).toBe(false);
    expect(component.type).toBe("password");
  });

  it("should emit focus event", () => {
    const focusEvent = new EventEmitter<HTMLInputElement>();
    component.inputFocusEvent = focusEvent;
    const spy = jest.spyOn(focusEvent, "emit");
    const inputElement = document.createElement("input") as HTMLInputElement;
    component.onFocus(inputElement);
    expect(spy).toHaveBeenCalledWith(inputElement);
  });

  it("should emit focus out event", () => {
    const focusOutEvent = new EventEmitter<HTMLInputElement>();
    component.inputFocusOutEvent = focusOutEvent;
    const spy = jest.spyOn(focusOutEvent, "emit");
    const inputElement = document.createElement("input") as HTMLInputElement;
    component.onFocusOut(inputElement);
    expect(spy).toHaveBeenCalledWith(inputElement);
  });

  it("should emit input event", () => {
    const inputEvent = new EventEmitter<HTMLInputElement>();
    component.inputEvent = inputEvent;
    const spy = jest.spyOn(inputEvent, "emit");
    const inputElement = document.createElement("input") as HTMLInputElement;
    component.onInput(inputElement);
    expect(spy).toHaveBeenCalledWith(inputElement);
  });
});
