import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { SearchConditions } from 'src/app/classes/searchconditions';
import { JPDateAdapter } from 'src/app/customed/jp-date-adapter';
import { SearchConditionsService } from 'src/app/services/search-conditions.service';

@Component({
  selector: 'app-search-conditions',
  templateUrl: './search-conditions.component.html',
  styleUrls: ['./search-conditions.component.scss'],
  providers: [{ provide: DateAdapter, useClass: JPDateAdapter }],
})
export class SearchConditionsComponent implements OnInit {
  searchConditions!: SearchConditions;
  subcription!: Subscription;
  @Output() searchConditionsChange: EventEmitter<SearchConditions> =
    new EventEmitter<SearchConditions>();

  constructor(
    private searchConditionService: SearchConditionsService,
    private dateAdapter: DateAdapter<NativeDateAdapter>
  ) {}

  ngOnInit(): void {
    //カレンダーの表示形式を日本に合わせる
    this.dateAdapter.setLocale('ja-JP');

    this.subcription =
      this.searchConditionService.searchConditionsSubject.subscribe(
        (data) => (this.searchConditions = data)
      );
  }

  onSearchConditionsChanged() {
    this.searchConditionsChange.emit(this.searchConditions);
  }
}
