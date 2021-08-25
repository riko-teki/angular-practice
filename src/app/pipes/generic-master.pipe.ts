import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { IGenericMaster } from '../interfaces/generic-master';
import { GenericMasterService } from '../services/generic-master.service';

@Pipe({
  name: 'genericMaster'
})
export class GenericMasterPipe implements PipeTransform {

  private subscription!: Subscription;
  genericMaster: IGenericMaster[] = [];

  constructor(private genericMasterService: GenericMasterService) {}

  transform(code: string, part: string): Observable<string> {
    let find: IGenericMaster | undefined;
    this.genericMaster = this.genericMasterService.genericMasterSubject.getValue()
    find = this.genericMaster.find(data => {
      return data.Code === code && data.Part === part;
    })
    return find? of(find.CodeName) : code === '' && part === '010'? of('未着手') : of(code);
  }

}
