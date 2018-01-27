import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PkedziennikSharedModule } from '../../shared';
import {
    UczenService,
    UczenPopupService,
    UczenComponent,
    UczenDetailComponent,
    UczenDialogComponent,
    UczenPopupComponent,
    UczenDeletePopupComponent,
    UczenDeleteDialogComponent,
    uczenRoute,
    uczenPopupRoute,
} from './';

const ENTITY_STATES = [
    ...uczenRoute,
    ...uczenPopupRoute,
];

@NgModule({
    imports: [
        PkedziennikSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UczenComponent,
        UczenDetailComponent,
        UczenDialogComponent,
        UczenDeleteDialogComponent,
        UczenPopupComponent,
        UczenDeletePopupComponent,
    ],
    entryComponents: [
        UczenComponent,
        UczenDialogComponent,
        UczenPopupComponent,
        UczenDeleteDialogComponent,
        UczenDeletePopupComponent,
    ],
    providers: [
        UczenService,
        UczenPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PkedziennikUczenModule {}
