import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DocumentListFilterComponent } from './document-list-filter.component';

describe('DocumentListFilterComponent', () => {
  let sut: DocumentListFilterComponent;

  describe('as a class', () => {
    beforeEach(() => {
      sut = new DocumentListFilterComponent();

      sut.nameFilterChange.emit = jest.fn();
    });

    it('should be initialized successfully', () => {
      expect(sut);
    });

    describe('onNameFilterChange', () => {
      it('should not emit when event is null', () => {
        sut.onNameFilterChange(null as unknown as Event);

        expect(sut.nameFilterChange.emit).not.toHaveBeenCalled();
      });

      it('should not emit when event target is null', () => {
        sut.onNameFilterChange({} as unknown as Event);

        expect(sut.nameFilterChange.emit).not.toHaveBeenCalled();
      });

      it('should emit value when event has proper target', () => {
        const expectedValue: string = 'value';
        const eventTargetMock: Partial<HTMLInputElement> = {
          value: expectedValue,
        };
        const eventMock: Partial<Event> = {
          currentTarget: eventTargetMock as EventTarget,
        };

        sut.onNameFilterChange(eventMock as Event);

        expect(sut.nameFilterChange.emit).toHaveBeenCalledTimes(1);
        expect(sut.nameFilterChange.emit).toHaveBeenNthCalledWith(
          1,
          expectedValue
        );
      });
    });
  });

  describe('as a component', () => {
    let fixture: ComponentFixture<DocumentListFilterComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [DocumentListFilterComponent],
        schemas: [NO_ERRORS_SCHEMA],
      });

      fixture = TestBed.createComponent(DocumentListFilterComponent);
    });

    it('should display child components correctly', () => {
      const nameFilterInput: DebugElement = fixture.debugElement.query(
        By.css('input')
      );
      expect(nameFilterInput);
      expect(nameFilterInput.properties.placeholder).toEqual('Filter by name');
    });

    it('name filter input change should call onNameFilterChange', () => {
      sut = fixture.componentInstance;
      sut.onNameFilterChange = jest.fn();
      const expectedEvent: Partial<Event> = {};
      const nameFilterInput: DebugElement = fixture.debugElement.query(
        By.css('input')
      );

      nameFilterInput.triggerEventHandler('change', expectedEvent);

      expect(sut.onNameFilterChange).toHaveBeenCalledTimes(1);
      expect(sut.onNameFilterChange).toHaveBeenNthCalledWith(1, expectedEvent);
    });
  });
});
