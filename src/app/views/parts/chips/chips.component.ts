import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent implements OnChanges {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  formCtrl = new FormControl();
  filteredValues!: Observable<any[]>;

  @Input() selectedValues!: any[];
  @Output() selectedValuesChange = new EventEmitter<any[]>();

  @Input() title: string = '';
  @Input() allValues!: any[];

  @ViewChild('valueInput') valueInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.allValues) {
      this.filteredValues = this.formCtrl.valueChanges.pipe(
        startWith(null),
        map((value: string | null) =>
          value ? this._filter(value) : this.allValues.slice()
        )
      );
    }
  }

  ngOnInit(): void {}

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const index = this.allValues.findIndex(
      (element) =>
        (element.CodeName ||
          element.LocationName ||
          element.FacilityName ||
          element.Name) === value
    );
    // chipを追加
    if (value && index >= 1) {
      this.selectedValues.push({ ...this.allValues[index] });
    }
    // Clear the input value
    event.chipInput!.clear();

    this.formCtrl.setValue(null);
    this.selectedValuesChange.emit(this.selectedValues);
  }

  remove(value: string): void {
    const index = this.selectedValues.indexOf(value);

    if (index >= 0) {
      this.selectedValues.splice(index, 1);
    }
    this.selectedValuesChange.emit(this.selectedValues);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const findElement = this.allValues.find(
      (element) => element === event.option.value
    );
    // chipを追加
    if (findElement) {
      this.selectedValues.push({ ...findElement });
    }
    this.valueInput.nativeElement.value = '';
    this.formCtrl.setValue(null);
    this.selectedValuesChange.emit(this.selectedValues);
  }

  private _filter(value: any): any {
    return this.allValues.filter(
      (before) =>
        (
          before.CodeName ||
          before.LocationName ||
          before.FacilityName ||
          before.Name
        ).indexOf(value) === 0
    );
  }
}
