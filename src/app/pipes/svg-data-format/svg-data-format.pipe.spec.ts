import { SvgDataFormatPipe } from './svg-data-format.pipe';

describe('SvgDataFormat Pipe', () => {
    let svgDataFormatPipe = new SvgDataFormatPipe();

    it('should give back the same value if the format is not currency', () => {
        const expectedVal = 42;
        let actualVal = svgDataFormatPipe.transform(expectedVal, 'answers');
        expect(actualVal).toBe('42');
    });

    it('should give back the value followed by the currency unit if the currency is not recognised', () => {
        const expectedVal = 42;
        let actualVal = svgDataFormatPipe.transform(expectedVal, 'currency', 'Shmeckels');
        expect(actualVal).toBe('42 Shmeckels');
    });

    it('should give back a currency formatted string', () => {
        const inputVal = 42;
        expect(svgDataFormatPipe.transform(inputVal, 'currency', 'GBP')).toBe('£42');
        expect(svgDataFormatPipe.transform(inputVal, 'currency', 'USD')).toBe('$42');
        expect(svgDataFormatPipe.transform(inputVal, 'currency', 'EUR')).toBe('€42');
        expect(svgDataFormatPipe.transform(inputVal, 'currency', 'CHF')).toBe('42 Fr.');
    })
})