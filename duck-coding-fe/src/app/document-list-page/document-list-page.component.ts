import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { DocumentsService } from 'src/services/documents.service';
import { DocumentDto } from '../models';

@Component({
  templateUrl: 'document-list-page.component.html',
})
export class DocumentListPageComponent {
  public documents$!: Observable<DocumentDto[]>;

  public constructor(documentService: DocumentsService) {
    this.documents$ = documentService.getDocuments();
  }
}
