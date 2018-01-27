/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PkedziennikTestModule } from '../../../test.module';
import { NauczycieleDialogComponent } from '../../../../../../main/webapp/app/entities/nauczyciele/nauczyciele-dialog.component';
import { NauczycieleService } from '../../../../../../main/webapp/app/entities/nauczyciele/nauczyciele.service';
import { Nauczyciele } from '../../../../../../main/webapp/app/entities/nauczyciele/nauczyciele.model';

describe('Component Tests', () => {

    describe('Nauczyciele Management Dialog Component', () => {
        let comp: NauczycieleDialogComponent;
        let fixture: ComponentFixture<NauczycieleDialogComponent>;
        let service: NauczycieleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PkedziennikTestModule],
                declarations: [NauczycieleDialogComponent],
                providers: [
                    NauczycieleService
                ]
            })
            .overrideTemplate(NauczycieleDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NauczycieleDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NauczycieleService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Nauczyciele(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.nauczyciele = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'nauczycieleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Nauczyciele();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.nauczyciele = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'nauczycieleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
