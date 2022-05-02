import { ErrorHandler } from '@angular/core';

export class GlobalErrorHandlerService implements ErrorHandler {
  public handleError(error: any): void {
    console.log(error.message);
  }
}
