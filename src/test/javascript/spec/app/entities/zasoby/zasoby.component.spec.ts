/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { PkedziennikTestModule } from '../../../test.module';
import { ZasobyComponent } from '../../../../../../main/webapp/app/entities/zasoby/zasoby.component';
import { ZasobyService } from '../../../../../../main/webapp/app/entities/zasoby/zasoby.service';
import { Zasoby } from '../../../../../../main/webapp/app/entities/zasoby/zasoby.model';

describe('Component Tests', () => {

    describe('Zasoby Management Component', () => {
        let comp: ZasobyComponent;
        let fixture: ComponentFixture<ZasobyComponent>;
        let service: ZasobyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PkedziennikTestModule],
                declarations: [ZasobyComponent],
                providers: [
                    ZasobyService
                ]
            })
            .overrideTemplate(ZasobyComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ZasobyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ZasobyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Zasoby(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.zasobies[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
