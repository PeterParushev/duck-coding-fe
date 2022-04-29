import { Component, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { DocumentDto } from '../models';

@Component({
  selector: 'dcf-document-list',
  templateUrl: 'document-list.component.html',
  styleUrls: ['document-list.component.scss'],
})
export class DocumentListComponent {
  @Input()
  public documents$!: Observable<DocumentDto[]>;
}
