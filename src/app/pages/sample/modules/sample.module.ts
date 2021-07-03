import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SampleComponent } from "../components/sample.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "sample",
    component: SampleComponent,
  },
];

@NgModule({
  declarations: [SampleComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SampleModule {}
