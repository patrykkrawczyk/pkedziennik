import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Uczen } from './uczen.model';
import { UczenService } from './uczen.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-uczen',
    templateUrl: './uczen.component.html'
})
export class UczenComponent implements OnInit, OnDestroy {
uczens: Uczen[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private uczenService: UczenService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.uczenService.query().subscribe(
            (res: ResponseWrapper) => {
                this.uczens = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUczens();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Uczen) {
        return item.id;
    }
    registerChangeInUczens() {
        this.eventSubscriber = this.eventManager.subscribe('uczenListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
