import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { MaintenanceResult } from 'src/app/classes/maintenance-result';
import { MaterialStock } from 'src/app/classes/material-stock';
import { ResultMaterialSummary } from 'src/app/classes/result-material-summary';
import { UsedMaterial } from 'src/app/classes/used-material';
import { IGenericMaster } from 'src/app/interfaces/generic-master';
import { IMaintenanceFile } from 'src/app/interfaces/maintenance-file';
import { IMaintenancePlanResult } from 'src/app/interfaces/maintenance-plan-result';
import { IMaintenanceResult } from 'src/app/interfaces/maintenance-result';
import { IMaterialStock } from 'src/app/interfaces/material-stock';
import { IUsedMaterial } from 'src/app/interfaces/used-material';
import { AuthService } from 'src/app/services/auth.service';
import { FileService } from 'src/app/services/file.service';
import { GenericMasterService } from 'src/app/services/generic-master.service';
import { ImageService } from 'src/app/services/image.service';
import { MaintenancePlanService } from 'src/app/services/maintenance-plan.service';
import { MaterialStockService } from 'src/app/services/material-stock.service';
import { RegistResultService } from 'src/app/services/regist-result.service';
import { UsedMaterialService } from 'src/app/services/used-material.service';
import { WorkManualService } from 'src/app/services/work-manual.service';
import { ConfirmDialogComponent } from '../../parts/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-regist-result-summary',
  templateUrl: './regist-result-summary.component.html',
  styleUrls: ['./regist-result-summary.component.scss'],
})
export class RegistResultSummaryComponent implements OnInit {
  maintenanceResult!: IMaintenanceResult;

  facility!: string;
  date!: string;

  //表示されるメンテナンス計画
  maintenances: IMaintenancePlanResult[] = [];

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
    private activatedRoute: ActivatedRoute,
    private maintenancePlanService: MaintenancePlanService,
    private genericMasterService: GenericMasterService,
    private registResultService: RegistResultService,
    private materialStockService: MaterialStockService,
    private usedMaterialService: UsedMaterialService,
    private workManualService: WorkManualService,
    private fileService: FileService,
    private authService: AuthService,
    private imageService: ImageService,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.genericMasterService.genericMasterSubject
      .pipe(take(1))
      .subscribe((data) =>
        this.genericMasterService.onNotifyGenericMasterChanged(data)
      );
    //その日の特定の設備のメンテナンス計画を取得
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      const date = param.get('date');
      const facilityCode = param.get('facilitycode');
      //パラメータが取得出来たら各種情報の初期化を始める
      if (date && facilityCode) {
        this.date = date;
        this.facility = facilityCode;

        //dateとfacilityでメンテナンスを取得
        this.maintenancePlanService
          .getMaintenancePlansResults(this.date, this.facility)
          .subscribe((data) => {
            this.maintenances = data;
          });
        //使用部材の取得
        this.usedMaterialService
          .getUsedMaterialByDateAndFacility(this.date, this.facility)
          .subscribe((data) => {
            //こっちは画面から変更できるプロパティ
            this.useMaterials = data;
            //こっちはデータ取得時から変更させないプロパティ
            this.previousUseMaterials = [...data];
          });
        //手順書ファイル名取得
        this.workManualService
          .getManualNames(this.facility)
          .subscribe((data) => {
            this.manualNames = data;
          });
        //画像ファイル取得
        this.fileService
          .getFilesSummary('actual', this.date, this.facility)
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
      }
    });

    //作業状況一覧を取得し、バインドプロパティへ設定
    this.genericMasterService.getWorkStatuses().subscribe((data) => {
      this.workStatuses = data.filter((data) => {
        //未着手のみ表示しない
        return data.Code != '0001';
      });
    });
    //判定条件を取得し、バインドプロパティへ設定
    this.genericMasterService.getResultOKNGConditions().subscribe((data) => {
      this.resultOKNGConditions = data;
    });
    //部材在庫を取得し、バインドプロパティへ設定
    this.materialStockService
      .getMaterialStockByFactoryAndFaclility(this.facility)
      .subscribe((data) => {
        this.allMaterials = data;
      });
  }
  /////まとめる項目が変更された時に配列の各プロパティを変更する処理/////
  onWorkStatusChanged(): void {
    const afterWorkStatus = this.maintenances[0].WorkStatus;
    this.maintenances.map((maintenance) => {
      maintenance.WorkStatus = afterWorkStatus;
    });
  }
  onWorkResultOverviewChanged(): void {
    const afterOverview = this.maintenances[0].WorkResultOverview;
    this.maintenances.map((maintenance) => {
      maintenance.WorkResultOverview = afterOverview;
    });
  }
  onWorkTimeChanged(): void {
    const afterTime = this.maintenances[0].WorkTime;
    this.maintenances.map((maintenance) => {
      maintenance.WorkTime = afterTime;
    });
  }
  //完了フラグの変更イベント
  //フラグなのにBooleanじゃないから
  //stringからboolean、booleanからstringを自力で…
  onCompleteFlagChanged(value: boolean): void {
    const afterFlag = value ? '1' : '0';
    this.maintenances.map((maintenance) => {
      maintenance.CompleteFlag = afterFlag;
    });
  }
  /////////////////////////////////////////////////

  //実績登録処理
  onUpdate(): void {
    console.log(this.maintenances);

    const results = this.maintenances.map(
      (maintenance) => new MaintenanceResult(maintenance)
    );
    // //入力内容からPOSTする実績、使用部材、変更前使用部材を内包したオブジェクトを生成
    const resultMaterial = new ResultMaterialSummary(
      results,
      this.useMaterials,
      this.previousUseMaterials
    );
    //点検結果が正常値を外れていれば確認ダイアログを表示してOKが押されたら登録
    if (
      this.maintenances.some((maintenance) => {
        return (
          maintenance.InspectionResultOKNG === '0002' ||
          maintenance.InspectionResultNum > maintenance.DecisionConditionMAX ||
          maintenance.InspectionResultNum < maintenance.DecisionConditionMIN
        );
      })
      // resultMaterial.Results.some((result) => {
      //   return (
      //     result.InspectionResultOKNG === '0002' ||
      //     this.maintenances.some((maintenance)=> {
      //       return result.InspectionResultCategory === '0001' &&
      //             (maintenance.DecisionConditionMIN > result.InspectionResultNum ||
      //              maintenance.DecisionConditionMAX < result.InspectionResultNum)
      //     })
      // result.InspectionResultNum >
      //   this.maintenances[0].DecisionConditionMAX ||
      // result.InspectionResultNum < this.maintenances[0].DecisionConditionMIN
      // );
      // })
    ) {
      const dialog = this.matDialog.open(ConfirmDialogComponent, {
        data: {
          title: '確認',
          message:
            '点検結果が不合格、又は正常値を外れている項目がありますが登録しますか？',
        },
      });
      //ダイアログ閉じられた後の処理
      dialog.afterClosed().subscribe((result: boolean) => {
        //ダイアログがOKで閉じられた場合、バリデーションへ
        if (result) {
          //入力のバリデーションを行う
          const [valid, reason] = resultMaterial.Validation();
          //バリデーション結果がOKの場合のみ登録処理
          if (valid) {
            //登録処理
            //点検日時を現在に設定
            resultMaterial.Results.map((result) => {
              let date = new Date();
              date.setTime(date.getTime() + 1000 * 60 * 60 * 9); //JSTに変換
              result.InspectionDatetime = date;
            });
            resultMaterial.Results.map((result) => {
              result.InsertUserID
                ? (result.UpdateUserID = this.authService.userID)
                : (result.InsertUserID = this.authService.userID);
            });
            //登録処理
            this.registResultService
              .postRegistResultSummary(resultMaterial)
              .subscribe((data) => {
                console.log(data);
                //dateとfacilityでメンテナンスを取得
                this.maintenancePlanService
                  .getMaintenancePlansResults(this.date, this.facility)
                  .subscribe((data) => {
                    this.maintenances = data;
                  });
              });
          } else {
            //バリデーション結果がNGの場合スナックバーを表示して実績登録処理を行わない
            this.snackBar.open(reason, '閉じる', { duration: 5000 });
          }
        }
      });
    } else {
      //入力のバリデーションを行う
      const [valid, reason] = resultMaterial.Validation();
      //バリデーション結果がOKの場合のみ登録処理
      if (valid) {
        //登録処理
        //点検日時を現在に設定
        resultMaterial.Results.map(
          (result) =>{
              let date = new Date();
              date.setTime(date.getTime() + 1000 * 60 * 60 * 9); //JSTに変換
              result.InspectionDatetime = date;
          }
        );
        resultMaterial.Results.map((result) => {
          result.InsertUserID
            ? (result.UpdateUserID = this.authService.userID)
            : (result.InsertUserID = this.authService.userID);
        });
        //登録処理
        this.registResultService
          .postRegistResultSummary(resultMaterial)
          .subscribe((data) => {
            console.log(data);
            //dateとfacilityでメンテナンスを取得
            this.maintenancePlanService
              .getMaintenancePlansResults(this.date, this.facility)
              .subscribe((data) => {
                this.maintenances = data;
              });
          });
      } else {
        //バリデーション結果がNGの場合スナックバーを表示して実績登録処理を行わない
        this.snackBar.open(reason, '閉じる', { duration: 5000 });
      }
    }
  }

  //ファイルのInput変更時処理
  onChangeInput(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.files) {
        for (let i = 0; i < event.target.files.length; i++) {
          const file = event.target.files[i];
          this.imageService.load(file).then((putFile) => {
            if (
              !this.putImages.some(
                (image) => image.FileName === putFile.FileName
              )
            ) {
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
      .postFilesSummary('actual', this.date, this.facility, this.putImages)
      .subscribe((data) => console.log(data));
  }

  //部材の追加時処理
  onAddMaterial() {
    const usedMaterial = new UsedMaterial(
      this.authService.signInFactory,
      this.maintenances[0].PlanGroupID,
      this.maintenances[0].PlanID
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

  //ファイルリンクをクリックしたときにファイルをGETしダウンロードさせる
  onLinkClicked(name: string) {
    this.workManualService.getManual(this.facility, name).subscribe((data) => {
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
