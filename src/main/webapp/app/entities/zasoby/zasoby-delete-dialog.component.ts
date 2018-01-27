import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Zasoby } from './zasoby.model';
import { ZasobyPopupService } from './zasoby-popup.service';
import { ZasobyService } from './zasoby.service';

@Component({
    selector: 'jhi-zasoby-delete-dialog',
    templateUrl: './zasoby-delete-dialog.component.html'
})
export class ZasobyDeleteDialogComponent {

    zasoby: Zasoby;

    constructor(
        private zasobyService: ZasobyService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.zasobyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'zasobyListModification',
                content: 'Deleted an zasoby'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-zasoby-delete-popup',
    template: ''
})
export class ZasobyDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private zasobyPopupService: ZasobyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.zasobyPopupService
                .open(ZasobyDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
