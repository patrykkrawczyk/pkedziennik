/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { PkedziennikTestModule } from '../../../test.module';
import { NauczycieleComponent } from '../../../../../../main/webapp/app/entities/nauczyciele/nauczyciele.component';
import { NauczycieleService } from '../../../../../../main/webapp/app/entities/nauczyciele/nauczyciele.service';
import { Nauczyciele } from '../../../../../../main/webapp/app/entities/nauczyciele/nauczyciele.model';

describe('Component Tests', () => {

    describe('Nauczyciele Management Component', () => {
        let comp: NauczycieleComponent;
        let fixture: ComponentFixture<NauczycieleComponent>;
        let service: NauczycieleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PkedziennikTestModule],
                declarations: [NauczycieleComponent],
                providers: [
                    NauczycieleService
                ]
            })
            .overrideTemplate(NauczycieleComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NauczycieleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NauczycieleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Nauczyciele(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.nauczycieles[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
