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
  @Input() hero?: Hero;
  hero_new?: Hero; // 직접 가져오는 방식으로 변경예정

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    // 직접 가져오는 방식 + 넘겨주는 방식 호환되도록 코드 보완
    const c_exists_id = this.route.snapshot.paramMap.has('id');
    if (!c_exists_id) {
      return;
    }
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(t_hero => this.hero_new = t_hero);
  }
}
