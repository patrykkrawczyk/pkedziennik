/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PkedziennikTestModule } from '../../../test.module';
import { WiadomosciDialogComponent } from '../../../../../../main/webapp/app/entities/wiadomosci/wiadomosci-dialog.component';
import { WiadomosciService } from '../../../../../../main/webapp/app/entities/wiadomosci/wiadomosci.service';
import { Wiadomosci } from '../../../../../../main/webapp/app/entities/wiadomosci/wiadomosci.model';

describe('Component Tests', () => {

    describe('Wiadomosci Management Dialog Component', () => {
        let comp: WiadomosciDialogComponent;
        let fixture: ComponentFixture<WiadomosciDialogComponent>;
        let service: WiadomosciService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PkedziennikTestModule],
                declarations: [WiadomosciDialogComponent],
                providers: [
                    WiadomosciService
                ]
            })
            .overrideTemplate(WiadomosciDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WiadomosciDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WiadomosciService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Wiadomosci(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.wiadomosci = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'wiadomosciListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Wiadomosci();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.wiadomosci = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'wiadomosciListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
