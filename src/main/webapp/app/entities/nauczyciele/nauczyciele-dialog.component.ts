import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Nauczyciele } from './nauczyciele.model';
import { NauczycielePopupService } from './nauczyciele-popup.service';
import { NauczycieleService } from './nauczyciele.service';

@Component({
    selector: 'jhi-nauczyciele-dialog',
    templateUrl: './nauczyciele-dialog.component.html'
})
export class NauczycieleDialogComponent implements OnInit {

    nauczyciele: Nauczyciele;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private nauczycieleService: NauczycieleService,
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
        if (this.nauczyciele.id !== undefined) {
            this.subscribeToSaveResponse(
                this.nauczycieleService.update(this.nauczyciele));
        } else {
            this.subscribeToSaveResponse(
                this.nauczycieleService.create(this.nauczyciele));
        }
    }

    private subscribeToSaveResponse(result: Observable<Nauczyciele>) {
        result.subscribe((res: Nauczyciele) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Nauczyciele) {
        this.eventManager.broadcast({ name: 'nauczycieleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-nauczyciele-popup',
    template: ''
})
export class NauczycielePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private nauczycielePopupService: NauczycielePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.nauczycielePopupService
                    .open(NauczycieleDialogComponent as Component, params['id']);
            } else {
                this.nauczycielePopupService
                    .open(NauczycieleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
