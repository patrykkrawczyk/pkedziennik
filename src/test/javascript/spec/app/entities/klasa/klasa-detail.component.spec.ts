/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { PkedziennikTestModule } from '../../../test.module';
import { KlasaDetailComponent } from '../../../../../../main/webapp/app/entities/klasa/klasa-detail.component';
import { KlasaService } from '../../../../../../main/webapp/app/entities/klasa/klasa.service';
import { Klasa } from '../../../../../../main/webapp/app/entities/klasa/klasa.model';

describe('Component Tests', () => {

    describe('Klasa Management Detail Component', () => {
        let comp: KlasaDetailComponent;
        let fixture: ComponentFixture<KlasaDetailComponent>;
        let service: KlasaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PkedziennikTestModule],
                declarations: [KlasaDetailComponent],
                providers: [
                    KlasaService
                ]
            })
            .overrideTemplate(KlasaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KlasaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KlasaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Klasa(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.klasa).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
