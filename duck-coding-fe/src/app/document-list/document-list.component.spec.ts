import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { DocumentDto } from '../models';
import { DocumentListComponent } from './document-list.component';

describe('DocumentListComponent', () => {
  let sut: DocumentListComponent;

  describe('as a class', () => {
    beforeEach(() => {
      sut = new DocumentListComponent();
    });

    it('should be initialized successfully', () => {
      expect(sut);
    });
  });

  describe('as a component', () => {
    let fixture: ComponentFixture<DocumentListComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [DocumentListComponent],
        schemas: [NO_ERRORS_SCHEMA],
      });

      fixture = TestBed.createComponent(DocumentListComponent);
      sut = fixture.componentInstance;
      sut.documents$ = of([]);
    });

    it('should show no documents message', () => {
      fixture.detectChanges();

      expect(fixture.nativeElement.innerHTML).toContain(
        'No documents match your filter!'
      );
    });

    it('should pass parameters to child components correctly', () => {
      const expectedDocuments: DocumentDto[] = getExpectedDocuments();
      sut.documents$ = of(expectedDocuments);

      fixture.detectChanges();

      const listItems: DebugElement[] = fixture.debugElement.queryAll(
        By.css('dcf-document-list-item')
      );
      expect(listItems);
      expect(listItems.length).toEqual(expectedDocuments.length);
      for (const [index, listItem] of listItems.entries()) {
        expect(listItem.properties.document).toEqual(expectedDocuments[index]);
      }
    });
  });

  function getExpectedDocuments(): DocumentDto[] {
    return [
      {
        id: '1',
        name: 'personalausweis',
        size: 10540,
        type: 'PDF',
        categories: ['cat_1', 'cat_2', 'cat_3'],
        deleted: false,
        createdAt: new Date('2021-10-16T10:14:41.595'),
        modifiedAt: new Date('2021-10-16T10:14:41.595'),
      },
      {
        id: '2',
        name: 'ehefrau_personalausweis',
        size: 15890,
        type: 'PDF',
        categories: ['cat_1', 'cat_2'],
        deleted: false,
        createdAt: new Date('2021-12-11T08:15:40.595'),
        modifiedAt: new Date('2021-12-11T08:15:40.595'),
      },
      {
        id: '3',
        name: 'Scan352732',
        size: 1029842,
        type: 'PDF',
        categories: ['cat_1', 'cat_4'],
        deleted: false,
        createdAt: new Date('2021-12-11T09:09:34.535'),
        modifiedAt: new Date('2021-12-11T09:09:56.315'),
      },
    ];
  }
});
