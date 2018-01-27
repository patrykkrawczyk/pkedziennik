import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Klasa } from './klasa.model';
import { KlasaService } from './klasa.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-klasa',
    templateUrl: './klasa.component.html'
})
export class KlasaComponent implements OnInit, OnDestroy {
klasas: Klasa[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private klasaService: KlasaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.klasaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.klasas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInKlasas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Klasa) {
        return item.id;
    }
    registerChangeInKlasas() {
        this.eventSubscriber = this.eventManager.subscribe('klasaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
