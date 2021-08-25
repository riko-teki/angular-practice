import { Component, Input, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { IMaintenanceFile } from 'src/app/interfaces/maintenance-file';
import { IMaintenancePlanResult } from 'src/app/interfaces/maintenance-plan-result';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-maintenance-detail',
  templateUrl: './maintenance-detail.component.html',
  styleUrls: ['./maintenance-detail.component.scss'],
})
export class MaintenanceDetailComponent implements OnInit {
  //メンテナンス計画データ
  @Input() maintenance!: IMaintenancePlanResult;
  //画像表示用のBase64エンコードデータ
  urls: SafeResourceUrl[] = [];
  images: IMaintenanceFile[] = [];

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    console.log(this.maintenance.PlanGroupID +this.maintenance.PlanID)
        // ファイルAPIから画像ファイルを取得してバインドプロパティへ設定
        this.fileService
        .getFiles(
          'plan',
          this.maintenance.PlanGroupID,
          this.maintenance.PlanID
        )
        .subscribe((data) => {
          data.forEach((image) => {
            this.images.push({
              FileName: image.FileName,
              URL: 'data:image/jpeg;base64,' + image.URL,
            });
          });
        });
  }
}
