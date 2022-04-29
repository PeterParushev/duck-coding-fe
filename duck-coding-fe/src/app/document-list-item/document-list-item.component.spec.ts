import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DocumentDto } from '../models';
import { DocumentListItemComponent } from './document-list-item.component';

describe('DocumentListComponent', () => {
  let sut: DocumentListItemComponent;

  describe('as a class', () => {
    beforeEach(() => {
      sut = new DocumentListItemComponent();
    });

    it('should be initialized successfully', () => {
      expect(sut);
    });
  });

  describe('as a component', () => {
    let fixture: ComponentFixture<DocumentListItemComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [DocumentListItemComponent],
        schemas: [NO_ERRORS_SCHEMA],
      });

      fixture = TestBed.createComponent(DocumentListItemComponent);
      sut = fixture.componentInstance;
    });

    it('should display table correctly', () => {
      const expectedDocument: DocumentDto = getExpectedDocument();
      sut.document = expectedDocument;
      const expectedTableHeadCellLables: string[] =
        getExpectedHeaderCellLables();

      fixture.detectChanges();

      const table: DebugElement = fixture.debugElement.query(By.css('table'));
      expect(table);

      const tableHead: DebugElement = table.query(By.css('thead'));
      expect(tableHead);
      const tableHeadRow: DebugElement = tableHead.query(By.css('tr'));
      expect(tableHeadRow);
      const tableHeadCells: DebugElement[] = tableHeadRow.queryAll(
        By.css('th')
      );
      expect(tableHeadCells);
      expect(tableHeadCells.length).toEqual(expectedTableHeadCellLables.length);
      for (const [index, cell] of tableHeadCells.entries()) {
        expect(cell.nativeElement.innerHTML).toEqual(
          expectedTableHeadCellLables[index]
        );
      }

      const tableBody: DebugElement = table.query(By.css('tbody'));
      expect(tableBody);
      const tableBodyRow: DebugElement = tableBody.query(By.css('tr'));
      expect(tableBodyRow);
      const tableBodyCells: DebugElement[] = tableBodyRow.queryAll(
        By.css('td')
      );
      const expectedDocumentObjectKeys: string[] =
        Object.keys(expectedDocument);

      expect(tableBodyCells.length).toEqual(expectedDocumentObjectKeys.length);
      expect(tableBodyCells[0].nativeElement.innerHTML).toEqual(
        expectedDocument.id
      );
      expect(tableBodyCells[1].nativeElement.innerHTML).toEqual(
        expectedDocument.name
      );
      expect(tableBodyCells[2].nativeElement.innerHTML).toEqual(
        expectedDocument.size.toString()
      );
      expect(tableBodyCells[3].nativeElement.innerHTML).toEqual(
        expectedDocument.type
      );
      expect(tableBodyCells[4].nativeElement.innerHTML).toEqual(
        expectedDocument.categories.toString()
      );
      expect(tableBodyCells[5].nativeElement.innerHTML).toEqual(
        expectedDocument.deleted.toString()
      );
      expect(tableBodyCells[6].nativeElement.innerHTML).toEqual(
        expectedDocument.createdAt.toString()
      );
      expect(tableBodyCells[7].nativeElement.innerHTML).toEqual(
        expectedDocument.modifiedAt.toString()
      );
    });
  });

  function getExpectedDocument(): DocumentDto {
    return {
      id: '1',
      name: 'personalausweis',
      size: 10540,
      type: 'PDF',
      categories: ['cat_1', 'cat_2', 'cat_3'],
      deleted: false,
      createdAt: new Date('2021-10-16T10:14:41.595'),
      modifiedAt: new Date('2021-10-16T10:14:41.595'),
    };
  }

  function getExpectedHeaderCellLables(): string[] {
    return [
      'Id',
      'Name',
      'Size',
      'Type',
      'Categories',
      'Deleted',
      'Created at',
      'Modified at',
    ];
  }
});
