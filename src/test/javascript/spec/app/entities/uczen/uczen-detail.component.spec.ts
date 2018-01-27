/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { PkedziennikTestModule } from '../../../test.module';
import { UczenDetailComponent } from '../../../../../../main/webapp/app/entities/uczen/uczen-detail.component';
import { UczenService } from '../../../../../../main/webapp/app/entities/uczen/uczen.service';
import { Uczen } from '../../../../../../main/webapp/app/entities/uczen/uczen.model';

describe('Component Tests', () => {

    describe('Uczen Management Detail Component', () => {
        let comp: UczenDetailComponent;
        let fixture: ComponentFixture<UczenDetailComponent>;
        let service: UczenService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PkedziennikTestModule],
                declarations: [UczenDetailComponent],
                providers: [
                    UczenService
                ]
            })
            .overrideTemplate(UczenDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UczenDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UczenService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Uczen(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.uczen).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
