import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Nauczyciele } from './nauczyciele.model';
import { NauczycieleService } from './nauczyciele.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-nauczyciele',
    templateUrl: './nauczyciele.component.html'
})
export class NauczycieleComponent implements OnInit, OnDestroy {
nauczycieles: Nauczyciele[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private nauczycieleService: NauczycieleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.nauczycieleService.query().subscribe(
            (res: ResponseWrapper) => {
                this.nauczycieles = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInNauczycieles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Nauczyciele) {
        return item.id;
    }
    registerChangeInNauczycieles() {
        this.eventSubscriber = this.eventManager.subscribe('nauczycieleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
