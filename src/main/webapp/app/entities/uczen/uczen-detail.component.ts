import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Uczen } from './uczen.model';
import { UczenService } from './uczen.service';

@Component({
    selector: 'jhi-uczen-detail',
    templateUrl: './uczen-detail.component.html'
})
export class UczenDetailComponent implements OnInit, OnDestroy {

    uczen: Uczen;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private uczenService: UczenService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUczens();
    }

    load(id) {
        this.uczenService.find(id).subscribe((uczen) => {
            this.uczen = uczen;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUczens() {
        this.eventSubscriber = this.eventManager.subscribe(
            'uczenListModification',
            (response) => this.load(this.uczen.id)
        );
    }
}
