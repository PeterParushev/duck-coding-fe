import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { DocumentsService } from 'src/services/documents.service';
import { DocumentDto } from '../models';
import { DocumentListComponent } from './document-list.component';

describe('DocumentListComponent', () => {
  let documentServiceMock: Partial<DocumentsService>;

  let sut: DocumentListComponent;

  beforeEach(() => {
    documentServiceMock = {
      getDocuments: jest.fn(() => of()),
    };
  });

  describe('as a class', () => {
    beforeEach(() => {
      sut = new DocumentListComponent(documentServiceMock as DocumentsService);
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
        providers: [
          {
            provide: DocumentsService,
            useValue: documentServiceMock as DocumentsService,
          },
        ],
      });

      fixture = TestBed.createComponent(DocumentListComponent);
    });

    it('should show component heading', () => {
      const heading: DebugElement = fixture.debugElement.query(By.css('h1'));

      expect(heading);
      expect(heading.nativeElement.innerHTML).toEqual('Documents:');
    });

    it('should show no documents message', () => {
      fixture.detectChanges();

      expect(fixture.nativeElement.innerHTML).toContain('No documents!');
    });

    it('should pass parameters to child components correctly', () => {
      const expectedDocuments: DocumentDto[] = getExpectedDocuments();
      documentServiceMock.getDocuments = jest.fn(() => of(expectedDocuments));
      fixture = TestBed.createComponent(DocumentListComponent);

      fixture.detectChanges();

      const listItems: DebugElement[] = fixture.debugElement.queryAll(
        By.css('dcf-document-list-item')
      );
      expect(listItems);
      expect(listItems.length).toEqual(expectedDocuments.length);
      for (const [index, listItem] of listItems.entries()) {
        expect(listItem.properties.document).toEqual(expectedDocuments[index]);
      }
      expect(documentServiceMock.getDocuments).toHaveBeenCalledTimes(1);
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
      {
        id: '4',
        name: 'Scan23732',
        size: 1652922,
        type: 'PDF',
        categories: ['cat_5'],
        deleted: false,
        createdAt: new Date('2021-12-11T09:09:34.535'),
        modifiedAt: new Date('2021-12-11T09:09:56.315'),
      },
      {
        id: '5',
        name: 'Scan56672',
        size: 1652922,
        type: 'PDF',
        categories: ['cat_3', 'cat_5'],
        deleted: true,
        createdAt: new Date('2021-12-12T09:09:00.125'),
        modifiedAt: new Date('2021-12-12T09:09:23.335'),
      },
      {
        id: '6',
        name: 'Scan35682',
        size: 165922,
        type: 'PDF',
        categories: ['cat_2', 'cat_3', 'cat_4'],
        deleted: true,
        createdAt: new Date('2021-12-12T09:12:10.155'),
        modifiedAt: new Date('2021-12-12T09:12:20.335'),
      },
      {
        id: '7',
        name: 'Scan55623',
        size: 16523,
        type: 'IMAGE',
        categories: ['cat_3'],
        deleted: false,
        createdAt: new Date('2022-01-05T09:12:10.155'),
        modifiedAt: new Date('2022-01-05T09:12:10.155'),
      },
      {
        id: '8',
        name: 'Scan55623',
        size: 16523,
        type: 'PDF',
        categories: ['cat_5'],
        deleted: false,
        createdAt: new Date('2022-01-05T09:15:40.755'),
        modifiedAt: new Date('2022-01-05T09:15:40.755'),
      },
      {
        id: '9',
        name: 'Scan55589',
        size: 16523,
        type: 'PDF',
        categories: ['cat_5'],
        deleted: false,
        createdAt: new Date('2022-01-06T11:45:34.435'),
        modifiedAt: new Date('2022-01-06T11:45:34.435'),
      },
      {
        id: '10',
        name: 'Scan79589',
        size: 462343,
        type: 'PDF',
        categories: ['cat_6', 'cat_34'],
        deleted: false,
        createdAt: new Date('2022-01-06T11:48:23.665'),
        modifiedAt: new Date('2022-01-06T11:48:21.665'),
      },
    ];
  }
});
