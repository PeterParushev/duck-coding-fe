import { Component, Input } from '@angular/core';

import { DocumentDto } from '../models';

@Component({
  selector: 'dcf-document-list-item',
  templateUrl: 'document-list-item.component.html',
  styleUrls: ['document-list-item.component.scss'],
})
export class DocumentListItemComponent {
  @Input()
  public document!: DocumentDto;
}
