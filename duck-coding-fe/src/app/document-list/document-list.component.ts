import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { DocumentsService } from 'src/services/documents.service';
import { DocumentDto } from '../models';

@Component({
  templateUrl: 'document-list.component.html',
  styleUrls: ['document-list.component.scss'],
})
export class DocumentListComponent {
  public documents$!: Observable<DocumentDto[]>;

  public constructor(documentService: DocumentsService) {
    this.documents$ = documentService.getDocuments();
  }
}
