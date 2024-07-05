import { TestBed } from "@angular/core/testing";
import { ThemeService } from "./theme.service";

describe("ThemeService", () => {
  let service: ThemeService;

  // Define the mockMatchMedia function in the proper scope
  const mockMatchMedia = (matches: boolean): MediaQueryList =>
    ({
      matches,
      media: "",
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }) as unknown as MediaQueryList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);

    // Mocking localStorage
    let store: { [key: string]: string } = {};
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = value;
        },
        clear: () => {
          store = {};
        }
      },
      writable: true
    });

    // Mocking matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(() => mockMatchMedia(false))
    });

    // Clear document body classes before each test
    document.body.className = "";
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("initiateTheme", () => {
    it("should set theme to dark-mode if device prefers dark mode", () => {
      (window.matchMedia as jest.Mock).mockReturnValue(mockMatchMedia(true));
      service.initiateTheme();
      expect(service.currentThemeMode).toBe("dark-mode");
      expect(document.body.classList.contains("dark-mode")).toBe(true);
    });

    it("should set theme to light-mode if device does not prefer dark mode", () => {
      (window.matchMedia as jest.Mock).mockReturnValue(mockMatchMedia(false));
      service.initiateTheme();
      expect(service.currentThemeMode).toBe("light-mode");
      expect(document.body.classList.contains("light-mode")).toBe(true);
    });

    it("should set theme to stored localStorage value if exists", () => {
      localStorage.setItem("theme-mode", "dark-mode");
      service.initiateTheme();
      expect(service.currentThemeMode).toBe("dark-mode");
      expect(document.body.classList.contains("dark-mode")).toBe(true);
    });
  });

  describe("updateCurrentMode", () => {
    it("should update the current theme mode and apply corresponding class to body", () => {
      service.updateCurrentMode("dark-mode");
      expect(service.currentThemeMode).toBe("dark-mode");
      expect(document.body.classList.contains("dark-mode")).toBe(true);
      expect(document.body.classList.contains("light-mode")).toBe(false);

      service.updateCurrentMode("light-mode");
      expect(service.currentThemeMode).toBe("light-mode");
      expect(document.body.classList.contains("light-mode")).toBe(true);
      expect(document.body.classList.contains("dark-mode")).toBe(false);
    });
  });

  describe("toggleMode", () => {
    it("should add dark-mode class to body when toggleMode is called", () => {
      service.toggleMode();
      expect(document.body.classList.contains("dark-mode")).toBe(true);
    });
  });

  describe("localStorageThemeMode", () => {
    it("should set the theme mode in localStorage", () => {
      const themeMode = "dark-mode";
      service.localStorageThemeMode = themeMode;
      expect(localStorage.getItem("theme-mode")).toBe(themeMode);
    });
  });
});
