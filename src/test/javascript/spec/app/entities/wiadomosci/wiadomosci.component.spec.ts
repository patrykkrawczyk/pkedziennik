/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { PkedziennikTestModule } from '../../../test.module';
import { WiadomosciComponent } from '../../../../../../main/webapp/app/entities/wiadomosci/wiadomosci.component';
import { WiadomosciService } from '../../../../../../main/webapp/app/entities/wiadomosci/wiadomosci.service';
import { Wiadomosci } from '../../../../../../main/webapp/app/entities/wiadomosci/wiadomosci.model';

describe('Component Tests', () => {

    describe('Wiadomosci Management Component', () => {
        let comp: WiadomosciComponent;
        let fixture: ComponentFixture<WiadomosciComponent>;
        let service: WiadomosciService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PkedziennikTestModule],
                declarations: [WiadomosciComponent],
                providers: [
                    WiadomosciService
                ]
            })
            .overrideTemplate(WiadomosciComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WiadomosciComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WiadomosciService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Wiadomosci(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.wiadomoscis[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
