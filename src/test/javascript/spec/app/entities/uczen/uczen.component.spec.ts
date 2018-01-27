/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { PkedziennikTestModule } from '../../../test.module';
import { UczenComponent } from '../../../../../../main/webapp/app/entities/uczen/uczen.component';
import { UczenService } from '../../../../../../main/webapp/app/entities/uczen/uczen.service';
import { Uczen } from '../../../../../../main/webapp/app/entities/uczen/uczen.model';

describe('Component Tests', () => {

    describe('Uczen Management Component', () => {
        let comp: UczenComponent;
        let fixture: ComponentFixture<UczenComponent>;
        let service: UczenService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PkedziennikTestModule],
                declarations: [UczenComponent],
                providers: [
                    UczenService
                ]
            })
            .overrideTemplate(UczenComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UczenComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UczenService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Uczen(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.uczens[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
