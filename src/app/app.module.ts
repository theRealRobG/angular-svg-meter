import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app.component';
import { SvgMeterComponent, ErrorMessageComponent } from './components';
import { SvgDataFormatPipe } from './pipes';
import { SvgMeterService } from './services';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        SvgMeterComponent,
        ErrorMessageComponent,
        SvgDataFormatPipe
    ],
    providers: [SvgMeterService],
    bootstrap: [AppComponent]
})
export class AppModule { }
