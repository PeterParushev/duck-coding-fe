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

  private nameFilter: string = '';
  private categoryFilter: string = '';

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

    this.nameFilter = nameFilter;

    this.applyFilters();
  }

  public onCategoryFilterChange(categoryFilter: string): void {
    if (!this.originalDocuments) {
      return;
    }

    this.categoryFilter = categoryFilter;

    this.applyFilters();
  }

  private applyFilters(): void {
    this.documents$ = of(
      this.originalDocuments
        .filter((document: DocumentDto) => {
          return document.name
            .toLowerCase()
            .includes(this.nameFilter.toLowerCase());
        })
        .filter((document: DocumentDto) => {
          return document.categories
            .toString()
            .toLowerCase()
            .includes(this.categoryFilter.toLowerCase());
        })
    );
  }
}
