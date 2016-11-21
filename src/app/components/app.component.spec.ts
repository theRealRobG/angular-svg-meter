import { TestBed, ComponentFixture, async, tick, fakeAsync, flushMicrotasks, discardPeriodicTasks } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ErrorMessageComponent, SvgMeterComponent } from '.';
import { SvgMeterService, SvgData } from '../services';

let appFixture: ComponentFixture<AppComponent>;
let appComponent: AppComponent;

class MockGoodSvgDataService {
    public getSvgData(): Promise<SvgData> {
        return Promise.resolve({
            value: 42,
            min: 0,
            max: 100
        });
    }
}
class MockBadSvgDataService {
    public getSvgData(): any {
        return Promise.reject('server on fire');
    }
}

describe('App', () => {
    describe('on good data', () => {
        let svgMeterService: SvgMeterService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    AppComponent,
                    ErrorMessageComponent,
                    SvgMeterComponent
                ],
                providers: [{ provide: SvgMeterService, useClass: MockGoodSvgDataService }]
            });
            appFixture = TestBed.createComponent(AppComponent)
            appComponent = appFixture.componentInstance;
            svgMeterService = appFixture.debugElement.injector.get(SvgMeterService);
        });

        beforeEach(async(() => {
            appFixture.detectChanges();
            appFixture.whenStable().then(() => appFixture.detectChanges());
        }));

        it('should set the min, max, and val immediately on server response', () => {
            expect(appComponent.svgMin).toBe(0);
            expect(appComponent.svgMax).toBe(100);
            expect(appComponent.svgVal).toBe(42);
        });

        it('should not be in an error state', () => {
            expect(appComponent.isError).toBe(false);
        });

        it('should have set the last good data date', () => {
            expect(appComponent.lastGoodData).not.toBeUndefined();
        });

        it('should set an interval that will poll for svg data', fakeAsync(() => {
            const tickTime = appComponent.queryIntervalInMilliSeconds;
            const getSvgDataSpy = spyOn(svgMeterService, 'getSvgData').and.callThrough();
            const handleGoodDataSpy = spyOn(appComponent, 'handleSvgData');
            const handleBadDataSpy = spyOn(appComponent, 'handleBadData');

            appComponent.startNewSvgDataInterval();

            expect(getSvgDataSpy).not.toHaveBeenCalled();
            expect(handleGoodDataSpy).not.toHaveBeenCalled();
            expect(handleBadDataSpy).not.toHaveBeenCalled();

            tick(tickTime);
            flushMicrotasks();

            expect(getSvgDataSpy).toHaveBeenCalledTimes(1);
            expect(handleGoodDataSpy).toHaveBeenCalledTimes(1);
            expect(handleBadDataSpy).not.toHaveBeenCalled();

            tick(tickTime);
            flushMicrotasks();

            expect(getSvgDataSpy).toHaveBeenCalledTimes(2);
            expect(handleGoodDataSpy).toHaveBeenCalledTimes(2);
            expect(handleBadDataSpy).not.toHaveBeenCalled();

            discardPeriodicTasks();
        }));
    });

    describe('on bad data', () => {
        let svgMeterService: SvgMeterService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    AppComponent,
                    ErrorMessageComponent,
                    SvgMeterComponent
                ],
                providers: [{ provide: SvgMeterService, useClass: MockBadSvgDataService }]
            });
            appFixture = TestBed.createComponent(AppComponent)
            appComponent = appFixture.componentInstance;
            svgMeterService = appFixture.debugElement.injector.get(SvgMeterService);
        });

        beforeEach(async(() => {
            appFixture.detectChanges();
            appFixture.whenStable().then(() => appFixture.detectChanges());
        }));

        it('should not set the min, max, and val on server response', () => {
            expect(appComponent.svgMin).toBeUndefined();
            expect(appComponent.svgMax).toBeUndefined();
            expect(appComponent.svgVal).toBeUndefined();
        });

        it('should be in an error state', () => {
            expect(appComponent.isError).toBe(true);
        });

        it('should not have set the last good data date', () => {
            expect(appComponent.lastGoodData).toBeUndefined();
        });
    });
});