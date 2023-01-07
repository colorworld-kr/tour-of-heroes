import { Component, OnInit } from '@angular/core';

import { Hero } from '../classes/hero';
// import { HeroService } from '../hero.service';
import { HeroFireService } from './../hero-fire.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    // private heroService: HeroService,
    private heroService: HeroFireService,
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(t_heroes => this.heroes = t_heroes.slice(1, 5));
  }
}
