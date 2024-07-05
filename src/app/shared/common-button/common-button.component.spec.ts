import { ComponentFixture, TestBed } from "@angular/core/testing";

import { input } from "@angular/core";
import { By } from "@angular/platform-browser";
import { CommonButtonComponent } from "./common-button.component";

describe("CommonButtonComponent", () => {
  let component: CommonButtonComponent;
  let fixture: ComponentFixture<CommonButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CommonButtonComponent);
    component = fixture.componentInstance;
    TestBed.runInInjectionContext(() => {
      const mockInputType = "text";
      component.buttonText = input<string>(mockInputType);
    });
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit event on button click", () => {
    // Arrange
    jest.spyOn(component.buttonClick, "emit");
    const buttonElement = fixture.debugElement.query(
      By.css("button")
    ).nativeElement;

    // Act
    const event = new MouseEvent("click");
    buttonElement.dispatchEvent(event);

    // Assert
    expect(component.buttonClick.emit).toHaveBeenCalledWith(event);
  });
});
