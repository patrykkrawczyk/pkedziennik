import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Uczen } from './uczen.model';
import { UczenPopupService } from './uczen-popup.service';
import { UczenService } from './uczen.service';

@Component({
    selector: 'jhi-uczen-dialog',
    templateUrl: './uczen-dialog.component.html'
})
export class UczenDialogComponent implements OnInit {

    uczen: Uczen;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private uczenService: UczenService,
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
        if (this.uczen.id !== undefined) {
            this.subscribeToSaveResponse(
                this.uczenService.update(this.uczen));
        } else {
            this.subscribeToSaveResponse(
                this.uczenService.create(this.uczen));
        }
    }

    private subscribeToSaveResponse(result: Observable<Uczen>) {
        result.subscribe((res: Uczen) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Uczen) {
        this.eventManager.broadcast({ name: 'uczenListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-uczen-popup',
    template: ''
})
export class UczenPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private uczenPopupService: UczenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.uczenPopupService
                    .open(UczenDialogComponent as Component, params['id']);
            } else {
                this.uczenPopupService
                    .open(UczenDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
