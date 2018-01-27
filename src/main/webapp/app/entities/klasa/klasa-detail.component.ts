import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Klasa } from './klasa.model';
import { KlasaService } from './klasa.service';

@Component({
    selector: 'jhi-klasa-detail',
    templateUrl: './klasa-detail.component.html'
})
export class KlasaDetailComponent implements OnInit, OnDestroy {

    klasa: Klasa;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private klasaService: KlasaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInKlasas();
    }

    load(id) {
        this.klasaService.find(id).subscribe((klasa) => {
            this.klasa = klasa;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInKlasas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'klasaListModification',
            (response) => this.load(this.klasa.id)
        );
    }
}
