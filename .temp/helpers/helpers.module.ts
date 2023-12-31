import { NgModule } from "@angular/core";
import { helpersProviders } from ".";

@NgModule({
    providers: [...helpersProviders]
})
export class EaHelpersModule {}