import { Component } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DocumentsService } from 'src/services/documents.service';
import { DocumentDto } from '../models';

@Component({
  templateUrl: 'document-list-page.component.html',
})
export class DocumentListPageComponent {
  public documents$!: Observable<DocumentDto[]>;
  public originalDocuments!: DocumentDto[];

  public constructor(documentService: DocumentsService) {
    this.documents$ = documentService.getDocuments().pipe(
      tap((documents: DocumentDto[]) => {
        this.originalDocuments = documents;
      })
    );
  }

  public onNameFilterChange(nameFilter: string): void {
    if (!this.originalDocuments) {
      return;
    }

    this.documents$ = of(
      this.originalDocuments.filter((document: DocumentDto) => {
        return document.name.toLowerCase().includes(nameFilter.toLowerCase());
      })
    );
  }
}
