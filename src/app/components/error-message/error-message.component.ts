import { Component, Input } from '@angular/core';

const DEFAULT_MESSAGE = 'Sorry, there is a problem with the data.';

@Component({
    selector: 'error-message',
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent {
    @Input() public lastGoodDate: Date;

    public getErrorMessage(): string {
        if (!this.lastGoodDate) {
            return DEFAULT_MESSAGE;
        }
        return `${DEFAULT_MESSAGE} The last good data was received: ${this.lastGoodDate}`;
    }
}