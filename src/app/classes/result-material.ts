import { IUsedMaterial } from '../interfaces/used-material';

// export class ResultMaterial {
//   constructor(
//     public Result: IMaintenanceResult,
//     public Materials: IUsedMaterial[],
//     public PreviousMaterials: IUsedMaterial[]
//   ) {}

//   Validation(): [boolean, string] {
//     let reason: string = '';
//     let valid: boolean = true;

//     //作業状況未入力判定
//     if (!this.Result.WorkStatus) {
//       reason += '作業状況が未入力です。';
//       valid = false;
//     }
//     //作業時間未入力判定
//     if (this.Result.WorkTime === null) {
//       reason += '作業時間が未入力です。';
//       valid = false;
//     } else if (
//       //作業時間の桁数チェック
//       Number.isInteger(this.Result.WorkTime) &&
//       this.Result.WorkTime.toString().length > 2
//     ) {
//       reason += '作業時間の数値の桁数が大きすぎます。';
//       valid = false;
//     } else if (!Number.isInteger(this.Result.WorkTime)) {
//       const resultArray = this.Result.WorkTime.toString().split('.');
//       console.log(resultArray);
//       if (resultArray[0].length > 2 || resultArray[1].length > 2) {
//         reason += '作業時間の数値の桁数が大きすぎます。';
//         valid = false;
//       }
//     }

//     if (this.Result.WorkResultOverview.length > 500) {
//       reason += '作業結果概要の文字数が大きすぎます。最大文字数:500';
//       valid = false;
//     }
//     if (this.Result.Comment.length > 200) {
//       reason += 'コメントの文字数が大きすぎます。最大文字数:200';
//       valid = false;
//     }

//     //点検結果数値の未入力判定
//     if (this.Result.InspectionResultNum === null) {
//       reason += '点検結果数値が未入力です。';
//       valid = false;
//     } else if (
//       //点検結果数値の桁数チェック
//       Number.isInteger(this.Result.InspectionResultNum) &&
//       this.Result.InspectionResultNum.toString().length > 15
//     ) {
//       reason += '点検結果数値の桁数が大きすぎます。';
//       valid = false;
//     } else if (!Number.isInteger(this.Result.InspectionResultNum)) {
//       const resultArray = this.Result.InspectionResultNum.toString().split('.');
//       if (resultArray[0].length > 8 || resultArray[1].length > 5) {
//         reason += '点検結果数値の桁数が大きすぎます。';
//         valid = false;
//       }
//     }
//     return [valid, reason];
//   }
// }
