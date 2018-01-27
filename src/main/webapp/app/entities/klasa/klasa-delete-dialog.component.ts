import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Klasa } from './klasa.model';
import { KlasaPopupService } from './klasa-popup.service';
import { KlasaService } from './klasa.service';

@Component({
    selector: 'jhi-klasa-delete-dialog',
    templateUrl: './klasa-delete-dialog.component.html'
})
export class KlasaDeleteDialogComponent {

    klasa: Klasa;

    constructor(
        private klasaService: KlasaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.klasaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'klasaListModification',
                content: 'Deleted an klasa'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-klasa-delete-popup',
    template: ''
})
export class KlasaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private klasaPopupService: KlasaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.klasaPopupService
                .open(KlasaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
