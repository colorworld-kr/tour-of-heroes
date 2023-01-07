import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  /**
   * 요청이 실패한 경우를 처리합니다.(Observable)
   * 애플리케이션 로직 흐름은 그대로 유지됩니다.
   * @param operation - 실패한 동작의 이름
   * @param log - 실패내용 기록할 함수
   * @param result - 기본값으로 반환할 객체
   */

  handleErrorObservable<T>(operation = 'operation', result?: T, log?: (message: string) => void) {
    return (error: any): Observable<T> => {
      this.handlerError(operation, error, log);
      // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
      return of(result as T);
    };
  }
  /**
   * 요청이 실패한 경우를 처리합니다. (Promise)
   * 애플리케이션 로직 흐름은 그대로 유지됩니다.
   * @param operation - 실패한 동작의 이름
   * @param log - 실패내용 기록할 함수
   * @param result - 기본값으로 반환할 객체
   */
  handleErrorPromise<T>(operation = 'operation', result?: T, log?: (message: string) => void) {
    return (error: any): Promise<T | undefined> => {
      this.handlerError(operation, error, log);

      // toPromise() @deprecated — Replaced with firstValueFrom and lastValueFrom .
      // Will be removed in v8.
      // Details: https://rxjs.dev/deprecations/to-promise
      // return of(result as T).toPromise();

      // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
      return new Promise<T | undefined>(re => re(result));
    };
  }
  private handlerError(operation: string, error: any, log?: (message: string) => void) {
    // TODO: 리모트 서버로 에러 메시지 보내기
    console.error(error); // 지금은 콘솔에 로그를 출력합니다.

    // TODO: 사용자가 이해할 수 있는 형태로 변환하기
    if (log) { log(`${operation} failed: ${error.message}`); }
  }
}
