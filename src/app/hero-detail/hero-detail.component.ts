import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Hero } from "../hero";
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero_input?: Hero;
  hero_directly?: Hero; // 직접 가져오는 방식으로 변경예정
  is_hero_directry: boolean = false;
  readonly test_var: string = ''; // 추가 샘플코드 : 클래스 영역에서는 const 대신 readonly

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    // 직접 가져오는 방식 + 넘겨주는 방식 호환되도록 코드 보완
    const c_exists_id = this.route.snapshot.paramMap.has('id');
    this.is_hero_directry = c_exists_id;
    // c_exists_id = false; // 컴파일 오류발생 (const, 상수)
    // this.test_var = ''; // 추가 샘플코드 : 컴파일 오류발생(readonly)
    if (!c_exists_id) {
      return;
    }
    this.getHero();
  }

  getHero(): void {
    // route.snapshot은 컴포넌트가 생성된 직후에 존재하는 라우팅 규칙에 대한 정보를 담고 있는 객체입니다.
    // 그래서 이 객체가 제공하는 paramMap을 사용하면 URL에 존재하는 라우팅 변수를 참조할 수 있습니다.
    // 지금 작성하고 있는 예제에서는 서버로부터 받아올 히어로의 id에 해당하는 값을 URL에 있는 "id" 키로 참조합니다.
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(t_hero => this.hero_directly = t_hero);
  }

  save(): void {
    // 직접 가져오는 방식 + 넘겨주는 방식 호환되도록 코드 보완
    const c_hero = this.is_hero_directry ? this.hero_directly : this.hero_input;
    if (c_hero) {
      this.heroService.updateHero(c_hero)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
