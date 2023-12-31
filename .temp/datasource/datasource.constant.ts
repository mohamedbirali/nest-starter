import { EaHelpersModule } from "@ea/helpers/helpers.module";

import { EaStackAvatarComponent } from "@ea/common/ui/blocks/stack-avatar/stack-avatar.component";
import { FuseCardModule } from "@fuse/components/card";
import { FuseMediaWatcherModule } from '@fuse/services/media-watcher';

import { DatasourceService } from "./datasource.service";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { PaginatorFrench } from "./datasource-inl.service";
import { EaDatasourceComponent } from "./datasource.component";
import {  OneToManyPipe, OneToOnePipe } from "./datasource.pipe";
import { EaTruncatePipe } from "@ea/common/pipes/truncate.pipe";
import { EaPhonePipe } from "@ea/common/pipes/phone.pipe";

export const datasourceDeclarations = [
    EaDatasourceComponent,
    OneToManyPipe,
    OneToOnePipe,
];

export const datasourceProviders = [
    DatasourceService,
    { provide: MatPaginatorIntl, useClass: PaginatorFrench },
];

export const datasourceImports = [
    // fuse
    // FuseScrollbarModule,
    FuseCardModule,
    FuseMediaWatcherModule,
    // ea
    // helpers
    EaHelpersModule,
    //  standalone
    EaStackAvatarComponent,
    EaTruncatePipe,
    EaPhonePipe,
];

export const datasourceExports = [
    EaDatasourceComponent,
];
