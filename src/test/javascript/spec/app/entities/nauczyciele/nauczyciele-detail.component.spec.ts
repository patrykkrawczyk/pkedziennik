/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { PkedziennikTestModule } from '../../../test.module';
import { NauczycieleDetailComponent } from '../../../../../../main/webapp/app/entities/nauczyciele/nauczyciele-detail.component';
import { NauczycieleService } from '../../../../../../main/webapp/app/entities/nauczyciele/nauczyciele.service';
import { Nauczyciele } from '../../../../../../main/webapp/app/entities/nauczyciele/nauczyciele.model';

describe('Component Tests', () => {

    describe('Nauczyciele Management Detail Component', () => {
        let comp: NauczycieleDetailComponent;
        let fixture: ComponentFixture<NauczycieleDetailComponent>;
        let service: NauczycieleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PkedziennikTestModule],
                declarations: [NauczycieleDetailComponent],
                providers: [
                    NauczycieleService
                ]
            })
            .overrideTemplate(NauczycieleDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NauczycieleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NauczycieleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Nauczyciele(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.nauczyciele).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
