import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  // base64Compression(file: File) {
  //   return new Promise<IMaintenanceFile>((resolve) => {
  //     //ファイルリーダー初期化
  //     const readerForURL = new FileReader();
  //     //返却オブジェクト
  //     let compressedFile: IMaintenanceFile = {
  //       FileName: file.name,
  //       URL: '',
  //     };
  //     //圧縮後の横幅は600px
  //     const compressedWidth = 600;
  //     //圧縮後の容量は100KB以下
  //     const compressedFileSize = 100000;
  //     //圧縮比
  //     let compressedRatio = 1;

  //     //ファイルリーダーの読み込み完了イベントを設定
  //     readerForURL.onload = () => {
  //       compressedFile.URL = readerForURL.result as string;
  //       const image = new Image();
  //       image.src = compressedFile.URL;

  //       let width;
  //       let height;

  //       image.onload = () => {
  //         //読み込んだ画像の横幅が圧縮後横幅より大きければ縦横比を
  //         //維持して圧縮サイズを取得
  //         if (compressedWidth < image.width) {
  //           //横幅は800px
  //           width = compressedWidth;
  //           //縦幅は元画像の高さ * (圧縮後横幅 / 元画像の横幅)
  //           height = image.height * (compressedWidth / image.width);
  //         } else {
  //           //元画像の横幅が圧縮後横幅以下ならサイズそのまま
  //           width = image.width;
  //           height = image.height;
  //         }

  //         //元画像のファイルサイズが圧縮後ファイルサイズより大きければ
  //         //圧縮比を圧縮後サイズ / 元画像のファイルサイズに設定する
  //         if (file.size >= compressedFileSize) {
  //           compressedRatio = compressedFileSize / file.size;
  //         }

  //         //canvasオブジェクトを生成
  //         const canvas = document.createElement('canvas');
  //         canvas.width = width;
  //         canvas.height = height;
  //         const ctx = canvas.getContext('2d');
  //         if (ctx) {
  //           console.log(ctx.canvas.width);
  //           ctx.drawImage(image, 0, 0, width, height);
  //           compressedFile.URL = ctx.canvas.toDataURL(
  //             'image/jpeg'
  //           );
  //           resolve(compressedFile);
  //         }
  //       };
  //     };
  //     readerForURL.readAsDataURL(file);
  //   });
  // }

  // async load(file: File): Promise<IMaintenanceFile> {
  //   const compressedFile = await this.base64Compression(file);
  //   return compressedFile;
  // }
}
