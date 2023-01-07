import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from "../components/heroes/heroes.component";
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: HeroDetailComponent },
];

/*
먼저, 라우팅 동작을 실행할 수 있도록 app-routing.module.ts 파일에 RouterModule과 Routes 심볼을 로드합니다.
그리고 라우팅 규칙에 따라 이동할 HeroesComponent를 로드합니다.
CommonModule을 로드했던 부분이나 declarations 배열은 필요없기 때문에 AppRoutingModule에서 제거했습니다.
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})

export class AppRoutingModule { }
