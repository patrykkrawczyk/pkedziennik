import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Zasoby } from './zasoby.model';
import { ZasobyPopupService } from './zasoby-popup.service';
import { ZasobyService } from './zasoby.service';

@Component({
    selector: 'jhi-zasoby-dialog',
    templateUrl: './zasoby-dialog.component.html'
})
export class ZasobyDialogComponent implements OnInit {

    zasoby: Zasoby;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private zasobyService: ZasobyService,
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
        if (this.zasoby.id !== undefined) {
            this.subscribeToSaveResponse(
                this.zasobyService.update(this.zasoby));
        } else {
            this.subscribeToSaveResponse(
                this.zasobyService.create(this.zasoby));
        }
    }

    private subscribeToSaveResponse(result: Observable<Zasoby>) {
        result.subscribe((res: Zasoby) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Zasoby) {
        this.eventManager.broadcast({ name: 'zasobyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-zasoby-popup',
    template: ''
})
export class ZasobyPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private zasobyPopupService: ZasobyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.zasobyPopupService
                    .open(ZasobyDialogComponent as Component, params['id']);
            } else {
                this.zasobyPopupService
                    .open(ZasobyDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
