import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { PkedziennikSharedModule, UserRouteAccessService } from './shared';
import { PkedziennikAppRoutingModule} from './app-routing.module';
import { PkedziennikHomeModule } from './home/home.module';
import { PkedziennikAdminModule } from './admin/admin.module';
import { PkedziennikAccountModule } from './account/account.module';
import { PkedziennikEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        PkedziennikAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        PkedziennikSharedModule,
        PkedziennikHomeModule,
        PkedziennikAdminModule,
        PkedziennikAccountModule,
        PkedziennikEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class PkedziennikAppModule {}
