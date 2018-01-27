import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PkedziennikSharedModule } from '../../shared';
import {
    WiadomosciService,
    WiadomosciPopupService,
    WiadomosciComponent,
    WiadomosciDetailComponent,
    WiadomosciDialogComponent,
    WiadomosciPopupComponent,
    WiadomosciDeletePopupComponent,
    WiadomosciDeleteDialogComponent,
    wiadomosciRoute,
    wiadomosciPopupRoute,
} from './';

const ENTITY_STATES = [
    ...wiadomosciRoute,
    ...wiadomosciPopupRoute,
];

@NgModule({
    imports: [
        PkedziennikSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WiadomosciComponent,
        WiadomosciDetailComponent,
        WiadomosciDialogComponent,
        WiadomosciDeleteDialogComponent,
        WiadomosciPopupComponent,
        WiadomosciDeletePopupComponent,
    ],
    entryComponents: [
        WiadomosciComponent,
        WiadomosciDialogComponent,
        WiadomosciPopupComponent,
        WiadomosciDeleteDialogComponent,
        WiadomosciDeletePopupComponent,
    ],
    providers: [
        WiadomosciService,
        WiadomosciPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PkedziennikWiadomosciModule {}
