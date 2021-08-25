// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  Title: 'FacilityManager_Development',
  authAPI: `http://10.10.0.28:11111/api/v1/test/userauth`,
  userAPI: `http://10.10.0.28:11111/api/v1/test/users`,
  genericMasterAPI: `http://10.10.0.28:11111/api/v1/test/genericmaster`,
  locationAPI: `http://10.10.0.28:11111/api/v1/test/location`,
  facilityAPI: `http://10.10.0.28:11111/api/v1/test/facility`,
  materialStockAPI: `http://10.10.0.28:11111/api/v1/test/materialstock`,
  maintenancePlansResultsAPI: `http://10.10.0.28:11111/api/v1/test/maintenance-plans-results`,
  usedMaterialAPI: `http://10.10.0.28:11111/api/v1/test/used-material`,
  usedMaterialSummaryAPI: `http://10.10.0.28:11111/api/v1/test/used-material-summary`,
  registResultAPI: `http://10.10.0.28:11111/api/v1/test/regist-result`,
  registResultSummaryAPI: `http://10.10.0.28:11111/api/v1/test/regist-result-summary`,
  bulkRegistResultAPI: `http://10.10.0.28:11111/api/v1/test/bulk-regist-result`,
  fileAPI: `http://10.10.0.28:11001/api/v1/test/files`,
  fileSummaryAPI: `http://10.10.0.28:11001/api/v1/test/files-summary`,
  manualNamesAPI: `http://10.10.0.28:11001/api/v1/test/manual-names`,
  manualAPI: `http://10.10.0.28:11001/api/v1/test/manual`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on result if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
