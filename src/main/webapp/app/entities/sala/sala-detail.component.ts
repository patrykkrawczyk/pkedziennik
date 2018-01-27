import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Sala } from './sala.model';
import { SalaService } from './sala.service';

@Component({
    selector: 'jhi-sala-detail',
    templateUrl: './sala-detail.component.html'
})
export class SalaDetailComponent implements OnInit, OnDestroy {

    sala: Sala;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private salaService: SalaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSalas();
    }

    load(id) {
        this.salaService.find(id).subscribe((sala) => {
            this.sala = sala;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSalas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'salaListModification',
            (response) => this.load(this.sala.id)
        );
    }
}
