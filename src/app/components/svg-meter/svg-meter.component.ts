import { Component, Input } from '@angular/core';

interface MeterStatusCssClassObj {
    red: boolean;
    orange: boolean;
    green: boolean;
}

const RADIUS_OVER_WIDTH = 50;
const RADIUS_OVER_HEIGHT = 100;

@Component({
    selector: 'svg-meter',
    templateUrl: './svg-meter.component.html',
    styleUrls: ['svg-meter.component.css']
})
export class SvgMeterComponent {
    @Input() public max: number;
    @Input() public min: number;
    @Input() public val: number;

    public getMeterStatusCssClassObj(): MeterStatusCssClassObj {
        const percentage = this.getPercentage();
        return {
            red: percentage < 0.33,
            orange: 0.33 <= percentage && percentage < 0.66,
            green: 0.66 <= percentage
        }
    }

    public getXVal(): number {
        const percentage = this.getPercentage();
        if (percentage === 0) {
            return 0;
        }
        if (percentage === 0.5) {
            return RADIUS_OVER_WIDTH;
        }
        if (percentage < 0.5) {
            return RADIUS_OVER_WIDTH * this.calculateXLessThan50(percentage);
        }
        if (percentage > 0.5) {
            return RADIUS_OVER_WIDTH * this.calculateXMoreThan50(percentage);
        }
    }

    public getYVal(): number {
        const percentage = this.getPercentage();
        if (percentage === 0) {
            return 100;
        }
        if (percentage === 0.5) {
            return 100 - RADIUS_OVER_HEIGHT;
        }
        if (percentage < 0.5) {
            return 100 - (RADIUS_OVER_HEIGHT * this.calculateYLessThan50(percentage));
        }
        if (percentage > 0.5) {
            return 100 - (RADIUS_OVER_HEIGHT * this.calculateYMoreThan50(percentage));
        }
    }

    private getPercentage(): number {
        const isMissingInput = !(this.max >= 0) || !(this.val >= 0) || !(this.min >= 0);
        if (isMissingInput || this.val < this.min || this.max <= this.min) {
            return 0;
        }
        return (this.val - this.min) / (this.max - this.min);
    }

    private calculateXLessThan50(percentage: number) {
        const theta = Math.PI * percentage;
        return 1 - Math.cos(theta);
    }
    private calculateXMoreThan50(percentage: number) {
        const theta = Math.PI * (1 - percentage);
        return 1 + Math.cos(theta);
    }

    private calculateYLessThan50(percentage: number) {
        const theta = Math.PI * percentage;
        return Math.sin(theta);
    }
    private calculateYMoreThan50(percentage: number) {
        const theta = Math.PI * (1 - percentage);
        return Math.sin(theta);
    }
}