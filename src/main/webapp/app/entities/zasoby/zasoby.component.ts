import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Zasoby } from './zasoby.model';
import { ZasobyService } from './zasoby.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-zasoby',
    templateUrl: './zasoby.component.html'
})
export class ZasobyComponent implements OnInit, OnDestroy {
zasobies: Zasoby[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private zasobyService: ZasobyService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.zasobyService.query().subscribe(
            (res: ResponseWrapper) => {
                this.zasobies = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInZasobies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Zasoby) {
        return item.id;
    }
    registerChangeInZasobies() {
        this.eventSubscriber = this.eventManager.subscribe('zasobyListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
