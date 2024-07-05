import { Injectable } from "@angular/core";

export type TThemeMode = "light-mode" | "dark-mode";

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  currentThemeMode: TThemeMode = "light-mode";

  initiateTheme() {
    const deviceMode = window.matchMedia("(prefers-color-scheme: dark)");
    let initMode = this.localStorageThemeMode as TThemeMode;
    if (!initMode) {
      initMode = deviceMode.matches ? "dark-mode" : "light-mode";
    }
    this.updateCurrentMode(initMode);
  }

  updateCurrentMode(themeMode: TThemeMode) {
    this.currentThemeMode = themeMode;
    document.body.classList.remove("light-mode");
    document.body.classList.remove("dark-mode");
    document.body.classList.add(this.currentThemeMode);
  }

  get localStorageThemeMode() {
    return localStorage.getItem("theme-mode") || "";
  }

  set localStorageThemeMode(themeMode: string) {
    localStorage.setItem("theme-mode", themeMode);
  }

  /**
   * @description - Function that toggles the current mode
   * Exposed publicly
   */
  toggleMode() {
    document.body.classList.add("dark-mode");
  }
}
