import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Wiadomosci } from './wiadomosci.model';
import { WiadomosciService } from './wiadomosci.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-wiadomosci',
    templateUrl: './wiadomosci.component.html'
})
export class WiadomosciComponent implements OnInit, OnDestroy {
wiadomoscis: Wiadomosci[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private wiadomosciService: WiadomosciService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.wiadomosciService.query().subscribe(
            (res: ResponseWrapper) => {
                this.wiadomoscis = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInWiadomoscis();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Wiadomosci) {
        return item.id;
    }
    registerChangeInWiadomoscis() {
        this.eventSubscriber = this.eventManager.subscribe('wiadomosciListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
