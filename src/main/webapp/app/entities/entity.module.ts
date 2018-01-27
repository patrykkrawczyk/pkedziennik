import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PkedziennikUczenModule } from './uczen/uczen.module';
import { PkedziennikKlasaModule } from './klasa/klasa.module';
import { PkedziennikSalaModule } from './sala/sala.module';
import { PkedziennikZasobyModule } from './zasoby/zasoby.module';
import { PkedziennikNauczycieleModule } from './nauczyciele/nauczyciele.module';
import { PkedziennikWiadomosciModule } from './wiadomosci/wiadomosci.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        PkedziennikUczenModule,
        PkedziennikKlasaModule,
        PkedziennikSalaModule,
        PkedziennikZasobyModule,
        PkedziennikNauczycieleModule,
        PkedziennikWiadomosciModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PkedziennikEntityModule {}
