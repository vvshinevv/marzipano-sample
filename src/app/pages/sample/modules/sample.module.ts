import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SampleComponent } from "../components/sample.component";
import { RouterModule, Routes } from "@angular/router";
import { SonghaeComponent } from '../components/songhae.component';

const routes: Routes = [
  {
    path: "sample",
    component: SampleComponent,
  },
  {
    path: "songhae",
    component: SonghaeComponent
  }
];

@NgModule({
  declarations: [SampleComponent, SonghaeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleModule {}
