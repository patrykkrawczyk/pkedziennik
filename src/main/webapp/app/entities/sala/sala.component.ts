import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Sala } from './sala.model';
import { SalaService } from './sala.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-sala',
    templateUrl: './sala.component.html'
})
export class SalaComponent implements OnInit, OnDestroy {
salas: Sala[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private salaService: SalaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.salaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.salas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSalas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Sala) {
        return item.id;
    }
    registerChangeInSalas() {
        this.eventSubscriber = this.eventManager.subscribe('salaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
