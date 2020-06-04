export interface AuthUser {
  username: string;
  password: string;
}
export interface RegisterUser {
  username: string;
  email: string;
  password1: string;
  password2: string;
}
export interface CurrentUser {
  pk: number;
  username: string;
  email?: string;
}
export interface JWTPayload {
  pk: number;
  username: string;
  email: string;
  exp: number;
}
/*
  Speed Test Interfaces
*/
export interface TestInit {
  tester: number;
  file_size_mb: number;
}
export interface SpeedTest extends TestInit{
  test_id: number;
  // tester: number;
  // file_size_mb: number;
}
export interface IntermediateTest {
  test_id: number;
  file: string;
  begin_timestamp: string;
  mode: string;
  duration: number;
  speed: number;
}
export interface IntermediateTestResult extends IntermediateTest {
  result_id: number;
}
// export interface UploadTestUnit {
//
// }
// export interface UploadUnitResult extends UploadTestUnit{
//
// }
export interface CurrentTest {
  test_id: number;
  file_size: number;
}
export interface TotalResult {
  tester_id: number;
  test_id: number;
  download_speed: number;
  upload_speed: number;
  server_name: string;
  date: string;
  expiration_date: string;
}
export interface TotalResultResponse extends TotalResult{
  total_result_id: number;
}
