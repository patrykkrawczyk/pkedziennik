import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Klasa } from './klasa.model';
import { KlasaPopupService } from './klasa-popup.service';
import { KlasaService } from './klasa.service';

@Component({
    selector: 'jhi-klasa-dialog',
    templateUrl: './klasa-dialog.component.html'
})
export class KlasaDialogComponent implements OnInit {

    klasa: Klasa;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private klasaService: KlasaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.klasa.id !== undefined) {
            this.subscribeToSaveResponse(
                this.klasaService.update(this.klasa));
        } else {
            this.subscribeToSaveResponse(
                this.klasaService.create(this.klasa));
        }
    }

    private subscribeToSaveResponse(result: Observable<Klasa>) {
        result.subscribe((res: Klasa) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Klasa) {
        this.eventManager.broadcast({ name: 'klasaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-klasa-popup',
    template: ''
})
export class KlasaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private klasaPopupService: KlasaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.klasaPopupService
                    .open(KlasaDialogComponent as Component, params['id']);
            } else {
                this.klasaPopupService
                    .open(KlasaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
