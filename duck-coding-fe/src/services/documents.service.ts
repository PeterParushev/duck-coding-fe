import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { DocumentDto } from 'src/app/models';

@Injectable({ providedIn: 'root' })
export class DocumentsService {
  // ideally this would come from a configuration service
  private documentsUri: string = 'http://localhost:8080/v1/documents';

  public constructor(private readonly httpClient: HttpClient) {}

  public getDocuments(): Observable<DocumentDto[]> {
    return this.httpClient.get<DocumentDto[]>(this.documentsUri, {
      responseType: 'json',
      observe: 'body',
    });
  }
}
