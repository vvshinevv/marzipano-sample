import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SampleModule } from "./pages/sample/modules/sample.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SampleModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
