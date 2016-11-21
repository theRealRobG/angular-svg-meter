import { async, inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { SvgMeterService } from './svg-data.service';

const fakeResponse = {
    min: 0,
    max: 100,
    value: 42
};

describe('SvgMeter Service', () => {
    let backend: MockBackend;
    let service: SvgMeterService;
    let response: Response;
    let httpSpy: jasmine.Spy;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                SvgMeterService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        }).compileComponents();
    }));

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
        backend = be;
        service = new SvgMeterService(http);
        let options = new ResponseOptions({ status: 200, body: fakeResponse });
        response = new Response(options);
        httpSpy = spyOn(http, 'get').and.callThrough();
    }));

    it('should make a http call', async(inject([], () => {
        service.getSvgData()
            .then(() => {
                expect(httpSpy).toHaveBeenCalled();
            });
    })));

    it('should have expected fake response', async(inject([], () => {
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        service.getSvgData()
            .then(svgData => {
                expect(svgData.min).toBe(0);
                expect(svgData.max).toBe(100);
                expect(svgData.value).toBe(42);
            });
    })));
});