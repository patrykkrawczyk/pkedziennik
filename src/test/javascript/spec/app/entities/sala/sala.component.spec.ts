/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { PkedziennikTestModule } from '../../../test.module';
import { SalaComponent } from '../../../../../../main/webapp/app/entities/sala/sala.component';
import { SalaService } from '../../../../../../main/webapp/app/entities/sala/sala.service';
import { Sala } from '../../../../../../main/webapp/app/entities/sala/sala.model';

describe('Component Tests', () => {

    describe('Sala Management Component', () => {
        let comp: SalaComponent;
        let fixture: ComponentFixture<SalaComponent>;
        let service: SalaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PkedziennikTestModule],
                declarations: [SalaComponent],
                providers: [
                    SalaService
                ]
            })
            .overrideTemplate(SalaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Sala(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.salas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
