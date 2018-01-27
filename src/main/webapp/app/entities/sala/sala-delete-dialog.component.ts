import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Sala } from './sala.model';
import { SalaPopupService } from './sala-popup.service';
import { SalaService } from './sala.service';

@Component({
    selector: 'jhi-sala-delete-dialog',
    templateUrl: './sala-delete-dialog.component.html'
})
export class SalaDeleteDialogComponent {

    sala: Sala;

    constructor(
        private salaService: SalaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.salaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'salaListModification',
                content: 'Deleted an sala'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sala-delete-popup',
    template: ''
})
export class SalaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private salaPopupService: SalaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.salaPopupService
                .open(SalaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
