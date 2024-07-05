import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { ThemeService } from "./core/theme/theme.service";

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;
const themeServiceMock = {
  initiateTheme: jest.fn()
};

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: ThemeService, useValue: themeServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'angular-best-practices' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("angular-best-practices");
  });

  it("should call themeService.initiateTheme on ngOnInit", () => {
    component.ngOnInit();
    expect(themeServiceMock.initiateTheme).toHaveBeenCalled();
  });
});
