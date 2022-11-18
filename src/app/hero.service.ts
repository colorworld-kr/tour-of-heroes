import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";
import { MessageService } from './message.service';

/*
* Angular CLI로 ng generate service 명령을 실행하면
* 이 서비스의 @Injectable() 데코레이터에 providedIn: 'root'를 지정해서
* 서비스 프로바이더를 최상위 인젝터 에 등록합니다.
* 프로바이더에 대해 자세하게 알아보려면 프로바이더 문서를 참고하세요.
* 프로바이더 문서 >> https://angular.kr/guide/providers
* 인젝터에 대해 자세하게 알아보려면 Angular의 의존성 주입 문서를 참고하세요.
* Angular의 의존성 주입 문서 >> https://angular.kr/guide/dependency-injection
*/
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // heroesUrl을 :base/:collectionName과 같은 형태로 정의합니다.
  // 이 주소는 서버의 리소스 위치에 따라 달라질 수 있습니다.
  // 이 주소에서 base는 어떤 종류의 요청인지 구별하는 변수이며,
  // collectionName은 in -memory - data - service.ts 파일에 있는 콜렉션을 구별하는 변수입니다.
  private heroesUrl = 'api/heroes';  // 웹 API 형식의 URL로 사용

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHero(id: number): Observable<Hero> {
    // 지금은 히어로의 `id` 프로퍼티가 항상 존재한다고 간주합니다.
    // 에러를 처리하는 방법은 다음 튜토리얼에 대해 알아봅니다.
    const hero = HEROES.find(h => h.id === id)!;
    return of(hero).pipe(
      delay(800), // pipe, delay 코드 추가 : 실 서비스와 비슷하게 0.8초의 딜레이 적용
      tap(_ => this.messageService.add(`HeroService: fetched hero id=${id}`)), // tap 코드 보완 : 데이터 응답 후 메시지 표시
    );
  }
}
