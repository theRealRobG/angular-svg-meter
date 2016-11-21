import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ErrorMessageComponent } from './error-message.component';

let errorMessageFixture: ComponentFixture<ErrorMessageComponent>;
const DEFAULT_MESSAGE = 'Sorry, there is a problem with the data.';

describe('Error Message', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ErrorMessageComponent
            ]
        });
        errorMessageFixture = TestBed.createComponent(ErrorMessageComponent);
    });

    it('should display a default message if there is no last good date', () => {
        errorMessageFixture.detectChanges();
        let errorMessage = errorMessageFixture.debugElement.query(By.css('p')).nativeElement.textContent;
        expect(errorMessage).toBe(DEFAULT_MESSAGE);
    });

    it('should display an error message containing the last good date if there is one', () => {
        const newDate = new Date();
        errorMessageFixture.componentInstance.lastGoodDate = newDate;
        errorMessageFixture.detectChanges();
        let errorMessage = errorMessageFixture.debugElement.query(By.css('p')).nativeElement.textContent;
        expect(errorMessage).toContain(`${newDate}`);
    });
});