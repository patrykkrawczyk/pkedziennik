/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PkedziennikTestModule } from '../../../test.module';
import { ZasobyDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/zasoby/zasoby-delete-dialog.component';
import { ZasobyService } from '../../../../../../main/webapp/app/entities/zasoby/zasoby.service';

describe('Component Tests', () => {

    describe('Zasoby Management Delete Component', () => {
        let comp: ZasobyDeleteDialogComponent;
        let fixture: ComponentFixture<ZasobyDeleteDialogComponent>;
        let service: ZasobyService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PkedziennikTestModule],
                declarations: [ZasobyDeleteDialogComponent],
                providers: [
                    ZasobyService
                ]
            })
            .overrideTemplate(ZasobyDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ZasobyDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ZasobyService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
