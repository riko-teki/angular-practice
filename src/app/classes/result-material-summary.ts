import { IUsedMaterial } from '../interfaces/used-material';

// export class ResultMaterialSummary {
//   constructor(
//     public Results: IMaintenanceResult[],
//     public Materials: IUsedMaterial[],
//     public PreviousMaterials: IUsedMaterial[]
//   ) {}

//   Validation(): [boolean, string] {
//     let reason: string = '';
//     let valid: boolean = true;

//     //作業状況未入力判定
//     if (this.Results.some((result) => !result.WorkStatus)) {
//       reason += '作業状況が未入力です。';
//       valid = false;
//     }

//     if (this.Results.some((result) => result.WorkResultOverview.length > 500)) {
//       reason += '作業結果概要の文字数が大きすぎます。最大文字数:500';
//       valid = false;
//     }

//     if (this.Results.some((result) => result.Comment.length > 200)) {
//       reason += 'コメントの文字数が大きすぎます。最大文字数:200';
//       valid = false;
//     }

//     if (this.Results.some((result) => result.WorkTime === null)) {
//       reason += '作業時間が未入力です。';
//       valid = false;
//     }
//     if (
//       this.Results.some(
//         (result) =>
//           Number.isInteger(result.WorkTime) &&
//           result.WorkTime.toString().length > 2
//       )
//     ) {
//       reason += '作業時間の数値の桁数が大きすぎます。';
//       valid = false;
//     }
//     if (
//       this.Results.some((result) => {
//         if (!Number.isInteger(result.WorkTime)) {
//           const resultArray = result.WorkTime.toString().split('.');
//           if (resultArray[0].length > 2 || resultArray[1].length > 2) {
//             return true;
//           }
//         }
//         return false;
//       })
//     ) {
//       reason += '作業時間の数値の桁数が大きすぎます。';
//       valid = false;
//     }

//     if (this.Results.some((result) => result.InspectionResultNum === null)) {
//       reason += '点検結果数値が未入力です。';
//       valid = false;
//     } else if (
//       this.Results.some(
//         (result) =>
//           Number.isInteger(result.InspectionResultNum) &&
//           result.InspectionResultNum.toString().length > 15
//       )
//     ) {
//       reason += '点検結果数値の桁数が大きすぎます。';
//       valid = false;
//     } else if (
//       this.Results.some((result) => {
//         if (!Number.isInteger(result.InspectionResultNum)) {
//           const resultArray = result.InspectionResultNum.toString().split('.');
//           if (resultArray[0].length > 8 || resultArray[1].length > 5) {
//             return true;
//           }
//         }
//         return false;
//       })
//     ) {
//       reason += '点検結果の数値の桁数が大きすぎます。';
//       valid = false;
//     }

//     return [valid, reason];
//   }
// }
