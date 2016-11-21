import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

export interface SvgData {
    value: number;
    min: number;
    max: number;
    format?: string;
    unit?: string;
}

@Injectable()
export class SvgMeterService {
    private svgDataUrl = 'https://widgister.herokuapp.com/challenge/frontend';

    constructor(private http: Http) { }

    public getSvgData(): Promise<SvgData> {
        return this.http.get(this.svgDataUrl)
            .toPromise()
            .then(response => response.json() as SvgData);
    }
}
