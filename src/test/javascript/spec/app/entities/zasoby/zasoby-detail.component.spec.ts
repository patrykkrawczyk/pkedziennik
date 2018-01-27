/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { PkedziennikTestModule } from '../../../test.module';
import { ZasobyDetailComponent } from '../../../../../../main/webapp/app/entities/zasoby/zasoby-detail.component';
import { ZasobyService } from '../../../../../../main/webapp/app/entities/zasoby/zasoby.service';
import { Zasoby } from '../../../../../../main/webapp/app/entities/zasoby/zasoby.model';

describe('Component Tests', () => {

    describe('Zasoby Management Detail Component', () => {
        let comp: ZasobyDetailComponent;
        let fixture: ComponentFixture<ZasobyDetailComponent>;
        let service: ZasobyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PkedziennikTestModule],
                declarations: [ZasobyDetailComponent],
                providers: [
                    ZasobyService
                ]
            })
            .overrideTemplate(ZasobyDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ZasobyDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ZasobyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Zasoby(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.zasoby).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
