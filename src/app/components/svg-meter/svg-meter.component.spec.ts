import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SvgMeterComponent } from './svg-meter.component';

let svgMeterFixture: ComponentFixture<SvgMeterComponent>;
let svgMeterComponent: SvgMeterComponent;

describe('SVG Meter', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                SvgMeterComponent
            ]
        });
        svgMeterFixture = TestBed.createComponent(SvgMeterComponent);
        svgMeterComponent = svgMeterFixture.componentInstance;
    });

    it('should have a red class if less than 33%', () => {
        svgMeterComponent.min = 0;
        svgMeterComponent.max = 100;
        svgMeterComponent.val = 30;
        svgMeterFixture.detectChanges();
        const meterEl = svgMeterFixture.debugElement.query(By.css('.meter'));
        expect(meterEl.classes['red']).toBe(true);
    });

    it('should have an orange class if between 33% and 66%', () => {
        svgMeterComponent.min = 0;
        svgMeterComponent.max = 100;
        svgMeterComponent.val = 50;
        svgMeterFixture.detectChanges();
        const meterEl = svgMeterFixture.debugElement.query(By.css('.meter'));
        expect(meterEl.classes['orange']).toBe(true);
    });

    it('should have a green class if over 66%', () => {
        svgMeterComponent.min = 0;
        svgMeterComponent.max = 100;
        svgMeterComponent.val = 87;
        svgMeterFixture.detectChanges();
        const meterEl = svgMeterFixture.debugElement.query(By.css('.meter'));
        expect(meterEl.classes['green']).toBe(true);
    });

    it('should report 0 if there is no min passed through', () => {
        svgMeterComponent.max = 100;
        svgMeterComponent.val = 60;
        svgMeterFixture.detectChanges();
        const svgLineNativeEl = svgMeterFixture.debugElement.nativeElement.querySelector('line');
        expect(parseInt(svgLineNativeEl.getAttribute('x2'))).toBe(0);
        expect(parseInt(svgLineNativeEl.getAttribute('y2'))).toBe(100);
    });

    it('should report 0 if there is no max passed through', () => {
        svgMeterComponent.min = 0;
        svgMeterComponent.val = 60;
        svgMeterFixture.detectChanges();
        const svgLineNativeEl = svgMeterFixture.debugElement.nativeElement.querySelector('line');
        expect(parseInt(svgLineNativeEl.getAttribute('x2'))).toBe(0);
        expect(parseInt(svgLineNativeEl.getAttribute('y2'))).toBe(100);
    });

    it('should report 0 if there is no val passed through', () => {
        svgMeterComponent.max = 100;
        svgMeterComponent.min = 0;
        svgMeterFixture.detectChanges();
        const svgLineNativeEl = svgMeterFixture.debugElement.nativeElement.querySelector('line');
        expect(parseInt(svgLineNativeEl.getAttribute('x2'))).toBe(0);
        expect(parseInt(svgLineNativeEl.getAttribute('y2'))).toBe(100);
    });

    it('should report half-way if val is half-way between min and max', () => {
        svgMeterComponent.min = 100;
        svgMeterComponent.max = 300;
        svgMeterComponent.val = 200;
        svgMeterFixture.detectChanges();
        const svgLineNativeEl = svgMeterFixture.debugElement.nativeElement.querySelector('line');
        expect(parseInt(svgLineNativeEl.getAttribute('x2'))).toBe(50);
        expect(parseInt(svgLineNativeEl.getAttribute('y2'))).toBe(0);
    });

    it('should report quarter-way if val is quarter-way between min and max', () => {
        svgMeterComponent.min = 1000;
        svgMeterComponent.max = 2000;
        svgMeterComponent.val = 1250;
        svgMeterFixture.detectChanges();
        const svgLineNativeEl = svgMeterFixture.debugElement.nativeElement.querySelector('line');
        const expectedXRoundedDown = Math.floor(50 * (1 - Math.cos(Math.PI / 4)));
        const expectedYRoundedDown = Math.floor(100 * (1 - Math.sin(Math.PI / 4)));
        expect(parseInt(svgLineNativeEl.getAttribute('x2'))).toBe(expectedXRoundedDown);
        expect(parseInt(svgLineNativeEl.getAttribute('y2'))).toBe(expectedYRoundedDown);
    });

    it('should report three-quarter-way if val is three-quarter-way between min and max', () => {
        svgMeterComponent.min = 50;
        svgMeterComponent.max = 150;
        svgMeterComponent.val = 125;
        svgMeterFixture.detectChanges();
        const svgLineNativeEl = svgMeterFixture.debugElement.nativeElement.querySelector('line');
        const expectedXRoundedDown = Math.floor(50 * (1 + Math.cos(Math.PI / 4)));
        const expectedYRoundedDown = Math.floor(100 * (1 - Math.sin(Math.PI / 4)));
        expect(parseInt(svgLineNativeEl.getAttribute('x2'))).toBe(expectedXRoundedDown);
        expect(parseInt(svgLineNativeEl.getAttribute('y2'))).toBe(expectedYRoundedDown);
    });
});