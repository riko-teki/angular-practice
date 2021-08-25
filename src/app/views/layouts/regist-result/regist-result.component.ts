import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MaintenanceResult } from 'src/app/classes/maintenance-result';
import { IGenericMaster } from 'src/app/interfaces/generic-master';
import { IMaintenancePlanResult } from 'src/app/interfaces/maintenance-plan-result';
import { IMaintenanceResult } from 'src/app/interfaces/maintenance-result';
import { IUsedMaterial } from 'src/app/interfaces/used-material';
import { IMaterialStock } from 'src/app/interfaces/material-stock';
import { GenericMasterService } from 'src/app/services/generic-master.service';
import { UsedMaterial } from 'src/app/classes/used-material';
import { AuthService } from 'src/app/services/auth.service';
import { MaterialStock } from 'src/app/classes/material-stock';
import { MaterialStockService } from 'src/app/services/material-stock.service';
import { UsedMaterialService } from 'src/app/services/used-material.service';
import { IMaintenanceFile } from 'src/app/interfaces/maintenance-file';
import { FileService } from 'src/app/services/file.service';
import { RegistResultService } from 'src/app/services/regist-result.service';
import { ResultMaterial } from 'src/app/classes/result-material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../parts/confirm-dialog/confirm-dialog.component';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { WorkManualService } from 'src/app/services/work-manual.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-regist-result',
  templateUrl: './regist-result.component.html',
  styleUrls: ['./regist-result.component.scss'],
})
export class RegistResultComponent implements OnInit {

  @Input() maintenance!: IMaintenancePlanResult;
  @Output() maintenanceOnChanged: EventEmitter<string> = new EventEmitter();

  maintenanceResult!: IMaintenanceResult;

  //作業状況
  workStatuses: IGenericMaster[] = [];

  //判定条件
  resultOKNGConditions: IGenericMaster[] = [];

  //選択されている在庫データ
  selectedMaterial: IMaterialStock = new MaterialStock();
  usedQTY: number = 0;

  //表示する部材在庫データ
  allMaterials: IMaterialStock[] = [];
  //使用部材として登録されたデータ
  useMaterials: IUsedMaterial[] = [];
  //画面表示時に取得した使用部材データ
  //ここは変更しない
  previousUseMaterials: IUsedMaterial[] = [];

  //画像データ
  putImages: IMaintenanceFile[] = [];
  //画像データがダウンロードし終わったか
  isFetched: boolean = false;

  //作業手順書
  manualNames: string[] = [];

  //管理者かどうか
  public get isManager(): boolean {
    return this.authService.isManager;
  }

  constructor(
    private genericMasterService: GenericMasterService,
    private registResultService: RegistResultService,
    private materialStockService: MaterialStockService,
    private usedMaterialService: UsedMaterialService,
    private workManualService: WorkManualService,
    private fileService: FileService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.maintenanceResult = new MaintenanceResult(this.maintenance);
    if (this.maintenanceResult.WorkStatus) {
      this.maintenanceResult.UpdateUserID = this.authService.userID;
    } else {
      this.maintenanceResult.InsertUserID = this.authService.userID;
    }

    this.usedMaterialService
      .getUsedMaterial(
        this.maintenance.PlanGroupID,
        this.maintenance.PlanID
      )
      .subscribe((data) => {
        this.useMaterials = data;
        this.previousUseMaterials = [...data];
      });

    this.fileService
      .getFiles(
        'actual',
        this.maintenanceResult.PlanGroupID,
        this.maintenanceResult.PlanID
      )
      .pipe(
        catchError((e) => {
          this.isFetched = true;
          return throwError(e);
        })
      )
      .subscribe((datas) => {
        this.isFetched = true;
        datas.map((data) => {
          data.URL = 'data:image/png;base64,' + data.URL;
          console.log(data);
          this.putImages.push(data);
        });
      });

    //作業状況一覧を取得し、バインドプロパティへ設定
    this.genericMasterService.getWorkStatuses().subscribe((data) => {
      console.log(this.authService.isManager);
      if (this.authService.isManager) {
        this.workStatuses = data.filter((data) => {
          //管理者の場合は未着手のみ表示しない
          return data.Code != '0001';
        });
      } else {
        this.workStatuses = data.filter((data) => {
          //一般の場合は未着手と完了のみ表示しない
          return data.Code != '0001' && data.Code != '0006';
        });
      }
    });
    //判定条件を取得し、バインドプロパティへ設定
    this.genericMasterService.getResultOKNGConditions().subscribe((data) => {
      this.resultOKNGConditions = data;
    });
    //部材在庫を取得し、バインドプロパティへ設定
    this.materialStockService
      .getMaterialStockByFactoryAndFaclility(this.maintenance.FacilityCode)
      .subscribe((data) => {
        this.allMaterials = data;
      });

    this.workManualService
      .getManualNames(this.maintenance.FacilityCode)
      .subscribe((data) => {
        this.manualNames = data;
      });
  }

  //実績登録処理
  onUpdate(): void {
    console.log(this.maintenanceResult);
    //入力内容からPOSTする実績、使用部材、変更前使用部材を内包したオブジェクトを生成
    const resultMaterial = new ResultMaterial(
      this.maintenanceResult,
      this.useMaterials,
      this.previousUseMaterials
    );

    //実績の作業状況と作業時間のNULLチェック
    //どちらかがNULLならタプル[0]がFALSE、[1]が理由
    const validResult = resultMaterial.Validation();

    //バリデーションNGの場合
    if (!validResult[0]) {
      //作業状況、作業時間どちらかがNULLならスナックバー表示して処理を中断
      this.snackBar.open(validResult[1], '閉じる');
      //バリデーションOKの場合
    } else {
      //点検結果が正常値を外れていれば確認ダイアログを表示してOKが押されたら登録
      if (
        resultMaterial.Result.InspectionResultOKNG === '0002' ||
        resultMaterial.Result.InspectionResultNum >
          this.maintenance.DecisionConditionMAX ||
        resultMaterial.Result.InspectionResultNum <
          this.maintenance.DecisionConditionMIN
      ) {
        const dialog = this.matDialog.open(ConfirmDialogComponent, {
          data: {
            title: '確認',
            message:
              '点検結果が不合格、又は正常値を外れていますが登録しますか？',
          },
        });
        dialog.afterClosed().subscribe((result: boolean) => {
          if (result) {
            //登録処理
            //点検日時を現在に設定
            resultMaterial.Result.InspectionDatetime = new Date();
            this.registResultService
              .postRegistResult(resultMaterial)
              .subscribe((data) => {
                console.log(data);
                this.maintenanceOnChanged.emit();
              });
          }
        });
      } else {
        //登録処理
        //点検日時を現在に設定
        resultMaterial.Result.InspectionDatetime = new Date();
        this.registResultService
          .postRegistResult(resultMaterial)
          .subscribe((data) => {
            console.log(data);
            this.maintenanceOnChanged.emit();
          });
      }
    }
  }

  //ファイルのInput変更時処理
  onChangeInput(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.files) {
        for (let i = 0; i < event.target.files.length; i++) {
          // let putFile: IMaintenanceFile = {
          //   FileName: '',
          //   URL: '',
          // };
          // const readerForURL = new FileReader();

          // //URL読み込み時にバインドプロパティへ代入
          // readerForURL.onload = () => {
          //   const result = readerForURL.result as string;
          //   putFile.URL = result;
          // };

          const file = event.target.files[i];
          // putFile.FileName = file.name;
          this.imageService.load(file).then((putFile) => {
            if (
              !this.putImages.some(
                (image) => image.FileName === putFile.FileName
              )
            ) {
              // readerForURL.readAsDataURL(file);
              console.log(putFile)
              this.putImages.push(putFile);
            } else {
              this.snackBar.open(
                '同名ファイルは複数アップロードできません。',
                '閉じる'
              );
            }
          });
          event.target.value = '';
        }
      }
    }
  }

  //ファイルの×ボタンが押されたらファイルを削除する
  onFileDelete(file: IMaintenanceFile, el: HTMLInputElement) {
    this.putImages = this.putImages.filter((data) => data != file);
  }
  //ファイルのアップロード
  onUpload() {
    this.fileService
      .postFiles(
        'actual',
        this.maintenanceResult.PlanGroupID,
        this.maintenanceResult.PlanID,
        this.putImages
      )
      .subscribe((data) => console.log(data));
  }

  //部材の追加時処理
  onAddMaterial() {
    const usedMaterial = new UsedMaterial(
      this.maintenanceResult.Factory,
      this.maintenanceResult.PlanGroupID,
      this.maintenanceResult.PlanID
    );
    usedMaterial.MaterialCode = this.selectedMaterial.MaterialCode;
    usedMaterial.MaterialName = this.selectedMaterial.MaterialName;
    usedMaterial.LotNo = this.selectedMaterial.LotNo;
    usedMaterial.UsedQTY = this.usedQTY;
    usedMaterial.InsertUserID = this.authService.userID;

    //既に選択されている使用部材と被ってたら
    const duplicate = this.useMaterials.find((material) => {
      return (
        material.MaterialCode === this.selectedMaterial.MaterialCode &&
        material.LotNo === this.selectedMaterial.LotNo
      );
    });
    if (duplicate) {
      if (
        this.selectedMaterial.StockQTY <
        duplicate.UsedQTY + usedMaterial.UsedQTY
      ) {
        this.snackBar.open('在庫数を超過しています。', '閉じる');
        return;
      } else {
        duplicate.UsedQTY = duplicate.UsedQTY + usedMaterial.UsedQTY;
        return;
      }
    } else if (duplicate === undefined) {
      if (this.selectedMaterial.StockQTY < usedMaterial.UsedQTY) {
        this.snackBar.open('在庫数を超過しています。', '閉じる');
        return;
      }
    }

    this.useMaterials.push({ ...usedMaterial });
    // this.allMaterials.find(material => {
    //   return material.MaterialCode === usedMaterial.MaterialCode &&
    //          material.LotNo === usedMaterial.LotNo
    // })?.StockQTY?  -= usedMaterial.UsedQTY
    // currentStock? currentStock.StockQTY -= usedMaterial.UsedQTY:
    this.selectedMaterial = new MaterialStock();
    this.usedQTY = 0;
    console.log(this.useMaterials);
  }

  //部材の削除時処理
  onRemoveMaterial(event: IUsedMaterial) {
    this.useMaterials = this.useMaterials.filter((material) => {
      return material !== event;
    });
  }
  //完了フラグの変更イベント
  //フラグなのにBooleanじゃないから
  //stringからboolean、booleanからstringを自力で…
  onCompleteFlagChanged(value: boolean) {
    if (value) {
      this.maintenanceResult.CompleteFlag = '1';
    } else {
      this.maintenanceResult.CompleteFlag = '0';
    }
  }

  //ファイルリンクをクリックしたときにファイルをGETしダウンロードさせる
  onLinkClicked(name: string){
    this.workManualService.getManual(this.maintenance.FacilityCode,name).subscribe(
      data => {
        //blobからURLを生成
        const url = window.URL.createObjectURL(data);
        //ファイルをダウンロードさせるために仮想aタグを生成
        let a = document.createElement('a');
        //bodyに仮想aタグを配置
        document.body.appendChild(a);
        //表示はさせない
        a.setAttribute('style', 'display: none');
        //生成したURLをリンクに設定
        a.href = url;
        //ダウンロードさせるファイル名を設定
        a.download = name;
        //強制的にクリックイベントを発火
        a.click();
        //メモリ上からURLを削除
        window.URL.revokeObjectURL(url);
      });
  }
}
