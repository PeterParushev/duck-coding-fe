import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';

import { DocumentDto } from 'src/app/models';
import { DocumentsService } from './documents.service';

describe('DocumentsService', () => {
  const expectedDocumentsUri: string = 'http://localhost:8080/v1/documents';

  let httpClientMock: Partial<HttpClient>;

  let sut: DocumentsService;

  beforeEach(() => {
    httpClientMock = {};

    sut = new DocumentsService(httpClientMock as HttpClient);
  });

  it('getDocuments should be successful', (done) => {
    const expectedDocuments: DocumentDto[] = getExpectedDocuments();

    // excuse the `any`, I know they are terrible.
    // It's just that I don't want to use the HttpClientTestingModule and TestBed for a service test.
    // And for some reason the compiler fails to recognise the signature of the overloaded method that I want to use
    (httpClientMock as any).get = jest.fn(() => of(expectedDocuments));
    sut.getDocuments().subscribe((documents: DocumentDto[]) => {
      expect(documents).toEqual(expectedDocuments);
      done();
    });

    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
    expect(httpClientMock.get).toHaveBeenNthCalledWith(
      1,
      expectedDocumentsUri,
      { responseType: 'json', observe: 'body' }
    );
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
