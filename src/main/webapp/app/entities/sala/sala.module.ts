import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PkedziennikSharedModule } from '../../shared';
import {
    SalaService,
    SalaPopupService,
    SalaComponent,
    SalaDetailComponent,
    SalaDialogComponent,
    SalaPopupComponent,
    SalaDeletePopupComponent,
    SalaDeleteDialogComponent,
    salaRoute,
    salaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...salaRoute,
    ...salaPopupRoute,
];

@NgModule({
    imports: [
        PkedziennikSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SalaComponent,
        SalaDetailComponent,
        SalaDialogComponent,
        SalaDeleteDialogComponent,
        SalaPopupComponent,
        SalaDeletePopupComponent,
    ],
    entryComponents: [
        SalaComponent,
        SalaDialogComponent,
        SalaPopupComponent,
        SalaDeleteDialogComponent,
        SalaDeletePopupComponent,
    ],
    providers: [
        SalaService,
        SalaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PkedziennikSalaModule {}
