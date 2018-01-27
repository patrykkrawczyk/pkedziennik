import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Wiadomosci } from './wiadomosci.model';
import { WiadomosciPopupService } from './wiadomosci-popup.service';
import { WiadomosciService } from './wiadomosci.service';

@Component({
    selector: 'jhi-wiadomosci-delete-dialog',
    templateUrl: './wiadomosci-delete-dialog.component.html'
})
export class WiadomosciDeleteDialogComponent {

    wiadomosci: Wiadomosci;

    constructor(
        private wiadomosciService: WiadomosciService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.wiadomosciService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'wiadomosciListModification',
                content: 'Deleted an wiadomosci'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-wiadomosci-delete-popup',
    template: ''
})
export class WiadomosciDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private wiadomosciPopupService: WiadomosciPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.wiadomosciPopupService
                .open(WiadomosciDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
