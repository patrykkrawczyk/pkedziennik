import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Uczen } from './uczen.model';
import { UczenPopupService } from './uczen-popup.service';
import { UczenService } from './uczen.service';

@Component({
    selector: 'jhi-uczen-delete-dialog',
    templateUrl: './uczen-delete-dialog.component.html'
})
export class UczenDeleteDialogComponent {

    uczen: Uczen;

    constructor(
        private uczenService: UczenService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.uczenService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'uczenListModification',
                content: 'Deleted an uczen'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-uczen-delete-popup',
    template: ''
})
export class UczenDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private uczenPopupService: UczenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.uczenPopupService
                .open(UczenDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
