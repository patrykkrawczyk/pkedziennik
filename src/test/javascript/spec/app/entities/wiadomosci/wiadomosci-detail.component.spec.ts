/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { PkedziennikTestModule } from '../../../test.module';
import { WiadomosciDetailComponent } from '../../../../../../main/webapp/app/entities/wiadomosci/wiadomosci-detail.component';
import { WiadomosciService } from '../../../../../../main/webapp/app/entities/wiadomosci/wiadomosci.service';
import { Wiadomosci } from '../../../../../../main/webapp/app/entities/wiadomosci/wiadomosci.model';

describe('Component Tests', () => {

    describe('Wiadomosci Management Detail Component', () => {
        let comp: WiadomosciDetailComponent;
        let fixture: ComponentFixture<WiadomosciDetailComponent>;
        let service: WiadomosciService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PkedziennikTestModule],
                declarations: [WiadomosciDetailComponent],
                providers: [
                    WiadomosciService
                ]
            })
            .overrideTemplate(WiadomosciDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WiadomosciDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WiadomosciService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Wiadomosci(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.wiadomosci).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
