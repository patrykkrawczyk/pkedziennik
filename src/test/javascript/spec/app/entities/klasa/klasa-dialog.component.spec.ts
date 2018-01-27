/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PkedziennikTestModule } from '../../../test.module';
import { KlasaDialogComponent } from '../../../../../../main/webapp/app/entities/klasa/klasa-dialog.component';
import { KlasaService } from '../../../../../../main/webapp/app/entities/klasa/klasa.service';
import { Klasa } from '../../../../../../main/webapp/app/entities/klasa/klasa.model';

describe('Component Tests', () => {

    describe('Klasa Management Dialog Component', () => {
        let comp: KlasaDialogComponent;
        let fixture: ComponentFixture<KlasaDialogComponent>;
        let service: KlasaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PkedziennikTestModule],
                declarations: [KlasaDialogComponent],
                providers: [
                    KlasaService
                ]
            })
            .overrideTemplate(KlasaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KlasaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KlasaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Klasa(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.klasa = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'klasaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Klasa();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.klasa = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'klasaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
