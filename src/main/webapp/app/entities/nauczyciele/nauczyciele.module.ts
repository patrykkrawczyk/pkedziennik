import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PkedziennikSharedModule } from '../../shared';
import {
    NauczycieleService,
    NauczycielePopupService,
    NauczycieleComponent,
    NauczycieleDetailComponent,
    NauczycieleDialogComponent,
    NauczycielePopupComponent,
    NauczycieleDeletePopupComponent,
    NauczycieleDeleteDialogComponent,
    nauczycieleRoute,
    nauczycielePopupRoute,
} from './';

const ENTITY_STATES = [
    ...nauczycieleRoute,
    ...nauczycielePopupRoute,
];

@NgModule({
    imports: [
        PkedziennikSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NauczycieleComponent,
        NauczycieleDetailComponent,
        NauczycieleDialogComponent,
        NauczycieleDeleteDialogComponent,
        NauczycielePopupComponent,
        NauczycieleDeletePopupComponent,
    ],
    entryComponents: [
        NauczycieleComponent,
        NauczycieleDialogComponent,
        NauczycielePopupComponent,
        NauczycieleDeleteDialogComponent,
        NauczycieleDeletePopupComponent,
    ],
    providers: [
        NauczycieleService,
        NauczycielePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PkedziennikNauczycieleModule {}
