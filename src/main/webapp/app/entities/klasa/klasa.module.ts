import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PkedziennikSharedModule } from '../../shared';
import {
    KlasaService,
    KlasaPopupService,
    KlasaComponent,
    KlasaDetailComponent,
    KlasaDialogComponent,
    KlasaPopupComponent,
    KlasaDeletePopupComponent,
    KlasaDeleteDialogComponent,
    klasaRoute,
    klasaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...klasaRoute,
    ...klasaPopupRoute,
];

@NgModule({
    imports: [
        PkedziennikSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        KlasaComponent,
        KlasaDetailComponent,
        KlasaDialogComponent,
        KlasaDeleteDialogComponent,
        KlasaPopupComponent,
        KlasaDeletePopupComponent,
    ],
    entryComponents: [
        KlasaComponent,
        KlasaDialogComponent,
        KlasaPopupComponent,
        KlasaDeleteDialogComponent,
        KlasaDeletePopupComponent,
    ],
    providers: [
        KlasaService,
        KlasaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PkedziennikKlasaModule {}
