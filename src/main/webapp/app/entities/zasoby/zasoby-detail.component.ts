import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Zasoby } from './zasoby.model';
import { ZasobyService } from './zasoby.service';

@Component({
    selector: 'jhi-zasoby-detail',
    templateUrl: './zasoby-detail.component.html'
})
export class ZasobyDetailComponent implements OnInit, OnDestroy {

    zasoby: Zasoby;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private zasobyService: ZasobyService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInZasobies();
    }

    load(id) {
        this.zasobyService.find(id).subscribe((zasoby) => {
            this.zasoby = zasoby;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInZasobies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'zasobyListModification',
            (response) => this.load(this.zasoby.id)
        );
    }
}
