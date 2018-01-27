import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Wiadomosci } from './wiadomosci.model';
import { WiadomosciService } from './wiadomosci.service';

@Component({
    selector: 'jhi-wiadomosci-detail',
    templateUrl: './wiadomosci-detail.component.html'
})
export class WiadomosciDetailComponent implements OnInit, OnDestroy {

    wiadomosci: Wiadomosci;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private wiadomosciService: WiadomosciService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInWiadomoscis();
    }

    load(id) {
        this.wiadomosciService.find(id).subscribe((wiadomosci) => {
            this.wiadomosci = wiadomosci;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInWiadomoscis() {
        this.eventSubscriber = this.eventManager.subscribe(
            'wiadomosciListModification',
            (response) => this.load(this.wiadomosci.id)
        );
    }
}
