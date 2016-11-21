import { Component, OnDestroy } from '@angular/core';
import '../../../public/css/styles.css';

import { SvgMeterService, SvgData } from '../services';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
    public svgMax: number;
    public svgMin: number;
    public svgVal: number;
    public dataFormat?: string;
    public dataUnit?: string;
    public isError = false;
    public lastGoodData: Date;
    public queryIntervalInMilliSeconds = 10000;
    private svgDataInterval: number;

    constructor(private svgMeterService: SvgMeterService) {
        this.getAndHandleSvgData();
        this.startNewSvgDataInterval();
    }

    public getAndHandleSvgData(): void {
        this.svgMeterService.getSvgData()
            .then(this.handleSvgData.bind(this))
            .catch(this.handleBadData.bind(this));
    }

    public startNewSvgDataInterval(): void {
        if (this.svgDataInterval) {
            clearInterval(this.svgDataInterval);
        }
        setInterval(this.getAndHandleSvgData.bind(this), this.queryIntervalInMilliSeconds);
    }

    public handleSvgData(svgData: SvgData): void {
        const isValInBetweenMinMax = svgData.min <= svgData.value && svgData.value <= svgData.max;
        const isMinLessThanMax = svgData.min <= svgData.max;
        if (!isValInBetweenMinMax || !isMinLessThanMax) {
            return this.handleBadData();
        }
        this.isError = false;
        this.lastGoodData = new Date();
        this.svgMax = svgData.max;
        this.svgMin = svgData.min;
        this.svgVal = svgData.value;
        this.dataFormat = svgData.format;
        this.dataUnit = svgData.unit;
    }

    public handleBadData(): void {
        this.isError = true;
    }

    public ngOnDestroy(): void {
        clearInterval(this.svgDataInterval);
    }
}
