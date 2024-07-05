import { Routes } from "@angular/router";
import { AuthenticationComponent } from "./authentication/component/authentication.component";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    path: "authentication",
    component: AuthenticationComponent
  },
  { path: "", redirectTo: "/authentication", pathMatch: "full" },

  {
    path: "manage",
    loadChildren: () =>
      import("./features/features.module").then((m) => m.FeaturesModule)
  },

  { path: "**", component: PageNotFoundComponent }
];
