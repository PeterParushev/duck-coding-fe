import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Observable, of } from 'rxjs';

import { DocumentsService } from 'src/services/documents.service';
import { DocumentDto } from '../models';
import { DocumentListPageComponent } from './document-list-page.component';

describe('DocumentListComponent', () => {
  let documentServiceMock: Partial<DocumentsService>;

  let sut: DocumentListPageComponent;

  beforeEach(() => {
    documentServiceMock = {
      getDocuments: jest.fn(() => of()),
    };
  });

  describe('as a class', () => {
    beforeEach(() => {
      sut = new DocumentListPageComponent(
        documentServiceMock as DocumentsService
      );
    });

    it('should be initialized successfully', () => {
      expect(sut);
      expect(sut.documents$).not.toBeNil();
      expect(documentServiceMock.getDocuments).toHaveBeenCalledTimes(1);
    });
  });

  describe('as a component', () => {
    let fixture: ComponentFixture<DocumentListPageComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [DocumentListPageComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          {
            provide: DocumentsService,
            useValue: documentServiceMock as DocumentsService,
          },
        ],
      });

      fixture = TestBed.createComponent(DocumentListPageComponent);
    });

    it('should show component heading', () => {
      const heading: DebugElement = fixture.debugElement.query(By.css('h1'));

      expect(heading);
      expect(heading.nativeElement.innerHTML).toEqual('Documents:');
    });

    it('should pass parameters to child components correctly', (done) => {
      const expectedDocuments: DocumentDto[] = getExpectedDocuments();
      const expectedObservable: Observable<DocumentDto[]> =
        of(expectedDocuments);
      documentServiceMock.getDocuments = jest.fn(() => expectedObservable);
      fixture = TestBed.createComponent(DocumentListPageComponent);

      fixture.detectChanges();

      const list: DebugElement = fixture.debugElement.query(
        By.css('dcf-document-list')
      );
      expect(list);
      list.properties.documents$.subscribe((actualDocuments: DocumentDto[]) => {
        expect(actualDocuments).toEqual(expectedDocuments);
        done();
      });
    });

    it('should react correctly to nameFilterChange event', () => {
      const expectedEventPayload: string = 'expectedEventPayload';
      sut = fixture.componentInstance;
      sut.onNameFilterChange = jest.fn();
      const nameFilterInput: DebugElement = fixture.debugElement.query(
        By.css('dcf-cocument-list-filter')
      );

      nameFilterInput.triggerEventHandler(
        'nameFilterChange',
        expectedEventPayload
      );

      expect(sut.onNameFilterChange).toHaveBeenCalledTimes(1);
      expect(sut.onNameFilterChange).toHaveBeenNthCalledWith(
        1,
        expectedEventPayload
      );
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
