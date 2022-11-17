import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";

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

  constructor(
    private messageService: MessageService,
  ) { }

  /*
  * 옵저버블 HeroService >> https://angular.kr/tutorial/toh-pt4#옵저버블-heroservice
  * Observable은 RxJS 라이브러리가 제공하는 클래스 중 가장 중요한 클래스입니다.
  * 이후에 HTTP에 대해서 알아볼 때 Angular의 HttpClient 클래스가 제공하는 메소드는 모두 RxJS가 제공하는 Observable 타입을 반환한다는 것을 다시 한 번 살펴볼 것입니다.
  * 이 튜토리얼에서는 리모트 서버를 사용하지 않고 RxJS의 of() 함수로 데이터를 즉시 반환해 봅시다.
  */
  getHeroes(): Observable<Hero[]> {
    const c_heroes = of(HEROES);
    this.messageService.add('Heroservice: fetched heroes');
    return c_heroes;
  }
}
