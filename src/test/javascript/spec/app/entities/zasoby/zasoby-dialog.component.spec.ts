/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PkedziennikTestModule } from '../../../test.module';
import { ZasobyDialogComponent } from '../../../../../../main/webapp/app/entities/zasoby/zasoby-dialog.component';
import { ZasobyService } from '../../../../../../main/webapp/app/entities/zasoby/zasoby.service';
import { Zasoby } from '../../../../../../main/webapp/app/entities/zasoby/zasoby.model';

describe('Component Tests', () => {

    describe('Zasoby Management Dialog Component', () => {
        let comp: ZasobyDialogComponent;
        let fixture: ComponentFixture<ZasobyDialogComponent>;
        let service: ZasobyService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PkedziennikTestModule],
                declarations: [ZasobyDialogComponent],
                providers: [
                    ZasobyService
                ]
            })
            .overrideTemplate(ZasobyDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ZasobyDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ZasobyService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Zasoby(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.zasoby = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'zasobyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Zasoby();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.zasoby = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'zasobyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
