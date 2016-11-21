import { Pipe, PipeTransform } from '@angular/core';

const currencyMap = {
    GBP: '£',
    USD: '$',
    EUR: '€',
    CHF: 'Fr.'
}

@Pipe({ name: 'svgDataFormat' })
export class SvgDataFormatPipe implements PipeTransform {
    transform(value: number, format?: string, unit?: string): string {
        if (format !== 'currency') {
            return `${value}`;
        }
        if (!currencyMap[unit]) {
            return `${value} ${unit}`;
        }
        const currencySymbol = currencyMap[unit];
        if (unit === 'CHF') {
            return `${value} ${currencySymbol}`;
        }
        return `${currencySymbol}${value}`;
    }
}