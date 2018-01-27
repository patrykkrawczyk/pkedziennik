import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PkedziennikSharedModule } from '../../shared';
import {
    ZasobyService,
    ZasobyPopupService,
    ZasobyComponent,
    ZasobyDetailComponent,
    ZasobyDialogComponent,
    ZasobyPopupComponent,
    ZasobyDeletePopupComponent,
    ZasobyDeleteDialogComponent,
    zasobyRoute,
    zasobyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...zasobyRoute,
    ...zasobyPopupRoute,
];

@NgModule({
    imports: [
        PkedziennikSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ZasobyComponent,
        ZasobyDetailComponent,
        ZasobyDialogComponent,
        ZasobyDeleteDialogComponent,
        ZasobyPopupComponent,
        ZasobyDeletePopupComponent,
    ],
    entryComponents: [
        ZasobyComponent,
        ZasobyDialogComponent,
        ZasobyPopupComponent,
        ZasobyDeleteDialogComponent,
        ZasobyDeletePopupComponent,
    ],
    providers: [
        ZasobyService,
        ZasobyPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PkedziennikZasobyModule {}
