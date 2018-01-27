/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { PkedziennikTestModule } from '../../../test.module';
import { KlasaComponent } from '../../../../../../main/webapp/app/entities/klasa/klasa.component';
import { KlasaService } from '../../../../../../main/webapp/app/entities/klasa/klasa.service';
import { Klasa } from '../../../../../../main/webapp/app/entities/klasa/klasa.model';

describe('Component Tests', () => {

    describe('Klasa Management Component', () => {
        let comp: KlasaComponent;
        let fixture: ComponentFixture<KlasaComponent>;
        let service: KlasaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PkedziennikTestModule],
                declarations: [KlasaComponent],
                providers: [
                    KlasaService
                ]
            })
            .overrideTemplate(KlasaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KlasaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KlasaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Klasa(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.klasas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
