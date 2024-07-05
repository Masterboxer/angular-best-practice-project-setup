import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LayoutStructureComponent } from "../shared/layout/layout-structure/layout-structure.component";

const featureRoutes: Routes = [
  {
    path: "",
    component: LayoutStructureComponent,
    children: [{ path: "dashboard", component: DashboardComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(featureRoutes), CommonModule],
  exports: [RouterModule]
})
export class FeaturesModule {}
