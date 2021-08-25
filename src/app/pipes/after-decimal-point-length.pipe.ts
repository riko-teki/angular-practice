import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'afterDecimalPointLength'
})
export class AfterDecimalPointLengthPipe implements PipeTransform {
  /**
   * 小数点と小数点以下桁数を受け取り表示用文字列を生成する
   * @param float 
   * @param length 
   * @returns
   */
  transform(float: number, length: number): string {
    if(float){
      const tmp = parseFloat(float.toString()).toFixed(length) 
      return parseFloat(tmp).toFixed(length)
    }else {
      return float.toString();
    }
  }
}
