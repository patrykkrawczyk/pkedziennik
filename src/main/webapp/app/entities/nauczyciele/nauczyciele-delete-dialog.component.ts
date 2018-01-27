import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Nauczyciele } from './nauczyciele.model';
import { NauczycielePopupService } from './nauczyciele-popup.service';
import { NauczycieleService } from './nauczyciele.service';

@Component({
    selector: 'jhi-nauczyciele-delete-dialog',
    templateUrl: './nauczyciele-delete-dialog.component.html'
})
export class NauczycieleDeleteDialogComponent {

    nauczyciele: Nauczyciele;

    constructor(
        private nauczycieleService: NauczycieleService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.nauczycieleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'nauczycieleListModification',
                content: 'Deleted an nauczyciele'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-nauczyciele-delete-popup',
    template: ''
})
export class NauczycieleDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private nauczycielePopupService: NauczycielePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.nauczycielePopupService
                .open(NauczycieleDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
