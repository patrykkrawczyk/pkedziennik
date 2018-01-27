import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Sala } from './sala.model';
import { SalaPopupService } from './sala-popup.service';
import { SalaService } from './sala.service';

@Component({
    selector: 'jhi-sala-dialog',
    templateUrl: './sala-dialog.component.html'
})
export class SalaDialogComponent implements OnInit {

    sala: Sala;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private salaService: SalaService,
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
        if (this.sala.id !== undefined) {
            this.subscribeToSaveResponse(
                this.salaService.update(this.sala));
        } else {
            this.subscribeToSaveResponse(
                this.salaService.create(this.sala));
        }
    }

    private subscribeToSaveResponse(result: Observable<Sala>) {
        result.subscribe((res: Sala) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Sala) {
        this.eventManager.broadcast({ name: 'salaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-sala-popup',
    template: ''
})
export class SalaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private salaPopupService: SalaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.salaPopupService
                    .open(SalaDialogComponent as Component, params['id']);
            } else {
                this.salaPopupService
                    .open(SalaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
