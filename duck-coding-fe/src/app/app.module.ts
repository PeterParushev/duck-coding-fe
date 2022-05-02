import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentListFilterComponent } from './document-list-filter/document-list-filter.component';
import { DocumentListItemComponent } from './document-list-item/document-list-item.component';
import { DocumentListPageComponent } from './document-list-page/document-list-page.component';
import { GlobalErrorHandlerService } from 'src/services/error-handling/error-handling.service';

@NgModule({
  declarations: [
    AppComponent,
    DocumentListComponent,
    DocumentListFilterComponent,
    DocumentListItemComponent,
    DocumentListPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
