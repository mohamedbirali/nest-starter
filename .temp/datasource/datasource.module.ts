import { 
    datasourceDeclarations, 
    datasourceExports, 
    datasourceImports, 
    datasourceProviders 
} from './datasource.constant';

import { NgModule } from '@angular/core';


@NgModule({
    providers: [...datasourceProviders],
    imports: [...datasourceImports, ...datasourceDeclarations],
    exports: [...datasourceExports]
})
export class EaDatasourceModule {}