import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dcf-cocument-list-filter',
  templateUrl: 'document-list-filter.component.html',
})
export class DocumentListFilterComponent {
  @Output()
  public nameFilterChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public categoryFilterChange: EventEmitter<string> = new EventEmitter();

  public onNameFilterChange(event: Event): void {
    if (!event?.currentTarget) {
      return;
    }

    this.nameFilterChange.emit((event.currentTarget as HTMLInputElement).value);
  }

  public onCategoryFilterChange(event: Event): void {
    if (!event?.currentTarget) {
      return;
    }

    this.categoryFilterChange.emit(
      (event.currentTarget as HTMLInputElement).value
    );
  }
}
