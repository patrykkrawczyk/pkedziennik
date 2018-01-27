/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { PkedziennikTestModule } from '../../../test.module';
import { SalaDetailComponent } from '../../../../../../main/webapp/app/entities/sala/sala-detail.component';
import { SalaService } from '../../../../../../main/webapp/app/entities/sala/sala.service';
import { Sala } from '../../../../../../main/webapp/app/entities/sala/sala.model';

describe('Component Tests', () => {

    describe('Sala Management Detail Component', () => {
        let comp: SalaDetailComponent;
        let fixture: ComponentFixture<SalaDetailComponent>;
        let service: SalaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PkedziennikTestModule],
                declarations: [SalaDetailComponent],
                providers: [
                    SalaService
                ]
            })
            .overrideTemplate(SalaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Sala(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.sala).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
