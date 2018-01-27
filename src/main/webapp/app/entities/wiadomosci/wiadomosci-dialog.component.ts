import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Wiadomosci } from './wiadomosci.model';
import { WiadomosciPopupService } from './wiadomosci-popup.service';
import { WiadomosciService } from './wiadomosci.service';

@Component({
    selector: 'jhi-wiadomosci-dialog',
    templateUrl: './wiadomosci-dialog.component.html'
})
export class WiadomosciDialogComponent implements OnInit {

    wiadomosci: Wiadomosci;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private wiadomosciService: WiadomosciService,
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
        if (this.wiadomosci.id !== undefined) {
            this.subscribeToSaveResponse(
                this.wiadomosciService.update(this.wiadomosci));
        } else {
            this.subscribeToSaveResponse(
                this.wiadomosciService.create(this.wiadomosci));
        }
    }

    private subscribeToSaveResponse(result: Observable<Wiadomosci>) {
        result.subscribe((res: Wiadomosci) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Wiadomosci) {
        this.eventManager.broadcast({ name: 'wiadomosciListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-wiadomosci-popup',
    template: ''
})
export class WiadomosciPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private wiadomosciPopupService: WiadomosciPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.wiadomosciPopupService
                    .open(WiadomosciDialogComponent as Component, params['id']);
            } else {
                this.wiadomosciPopupService
                    .open(WiadomosciDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
