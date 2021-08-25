import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { SearchConditions } from 'src/app/classes/searchconditions';
import { JPDateAdapter } from 'src/app/customed/jp-date-adapter';

@Component({
  selector: 'app-search-conditions',
  templateUrl: './search-conditions.component.html',
  styleUrls: ['./search-conditions.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: JPDateAdapter }
  ]
})
export class SearchConditionsComponent implements OnInit {

  @Input() searchConditions!: SearchConditions;
  @Output() searchConditionsChange: EventEmitter<SearchConditions> = new EventEmitter<SearchConditions>();
 

  constructor(dateAdapter: DateAdapter<NativeDateAdapter>) {
    //カレンダーの表示形式を日本に合わせる
    dateAdapter.setLocale('ja-JP');
  }

  ngOnInit(): void {}

  onSearchConditionsChanged() {
    this.searchConditionsChange.emit(this.searchConditions);
  }

}
