import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../classes/hero';
// import { HeroService } from '../hero.service';
import { HeroFireService } from './../hero-fire.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  // AsyncPipe
  // *ngFor는 히어로 객체를 순회하는데, 이 때 heroes 배열대신 heroes$를 사용합니다.
  // $는 Observable을 뜻하는 관용적 표현입니다.
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    // private heroService: HeroService
    private heroService: HeroFireService,
  ) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // 연속된 키입력을 처리하기 위해 300ms 대기합니다.
      debounceTime(300),

      // 이전에 입력한 검색어와 같으면 무시합니다.
      distinctUntilChanged(),

      // 검색어가 변경되면 새로운 옵저버블을 생성합니다.
      // 참고:
      // 이전에 발생한 searchHeroes() Observable을 취소했다고 해서 이미 보낸 HTTP 요청을 취소하지는 않습니다.
      // 필요없는 응답은 애플리케이션 코드에서 처리하세요.
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
  // 사용자가 입력한 검색어를 옵저버블 스트림으로 보냅니다.
  search(term: string): void {
    this.searchTerms.next(term);
  }
}
