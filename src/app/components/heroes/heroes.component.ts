import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';

import { Hero } from 'src/app/classes/hero';
// import { HeroService } from "src/app/services/hero.service";
import { HeroFireService } from 'src/app/services/hero-fire.service';
import { MessageService } from 'src/app/services-local/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
  selectedHero?: Hero;
  isLogin: boolean = false;

  constructor(
    // private heroService: HeroService,
    private heroService: HeroFireService,
    private messageService: MessageService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getHeroes();
    this.getCurrentUserInfo();
  }

  getCurrentUserInfo(): void {
    this.userService.getCurrentUserInfo()
      .then(user => this.isLogin = user.isLogin)
      .catch(err => this.isLogin = false);
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(t_heroes => this.heroes = t_heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    let c_deleted_hero = hero;
    this.heroes = this.heroes.filter(t_h => t_h !== hero);
    this.heroService.deleteHero(hero.id)
      .pipe(
        catchError(_ => {
          this.heroes.push(c_deleted_hero); // 삭제된 히어로 다시 삽입
          this.heroes.sort((a, b) => a.id - b.id); // id 기준으로 다시 정렬
          return [];
        }) // 코드 의도 : api 오류 발생시 삭제된 데이터 복구 / 올바르게 작동하는지 확인 필요
      ).subscribe();

    // 삭제된 데이터 복구 로직 확인용 코드
    // ).subscribe(_ => {
    //   this.heroes.push(c_deleted_hero);
    //   this.heroes.sort((a, b) => a.id - b.id);
    // });
  }
}
