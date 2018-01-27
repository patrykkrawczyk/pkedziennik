import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Nauczyciele } from './nauczyciele.model';
import { NauczycieleService } from './nauczyciele.service';

@Component({
    selector: 'jhi-nauczyciele-detail',
    templateUrl: './nauczyciele-detail.component.html'
})
export class NauczycieleDetailComponent implements OnInit, OnDestroy {

    nauczyciele: Nauczyciele;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private nauczycieleService: NauczycieleService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNauczycieles();
    }

    load(id) {
        this.nauczycieleService.find(id).subscribe((nauczyciele) => {
            this.nauczyciele = nauczyciele;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNauczycieles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'nauczycieleListModification',
            (response) => this.load(this.nauczyciele.id)
        );
    }
}
