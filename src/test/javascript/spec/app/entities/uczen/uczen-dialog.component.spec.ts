/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PkedziennikTestModule } from '../../../test.module';
import { UczenDialogComponent } from '../../../../../../main/webapp/app/entities/uczen/uczen-dialog.component';
import { UczenService } from '../../../../../../main/webapp/app/entities/uczen/uczen.service';
import { Uczen } from '../../../../../../main/webapp/app/entities/uczen/uczen.model';

describe('Component Tests', () => {

    describe('Uczen Management Dialog Component', () => {
        let comp: UczenDialogComponent;
        let fixture: ComponentFixture<UczenDialogComponent>;
        let service: UczenService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PkedziennikTestModule],
                declarations: [UczenDialogComponent],
                providers: [
                    UczenService
                ]
            })
            .overrideTemplate(UczenDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UczenDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UczenService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Uczen(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.uczen = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'uczenListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Uczen();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.uczen = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'uczenListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
