import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from './services/user.service';
import { FirebaseUserModel } from './classes/user.model';
import { AuthService } from './services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  user: FirebaseUserModel = new FirebaseUserModel();
  private _title = 'Tour of Heroes';
  private unsubscribe$ = new Subject();

  public get title(): string {
    return environment.production ? this._title : `${this._title} (not prod)`;
  }

  constructor(
    public authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null); // .next(); // Subject<unknown>.next(value: unknown): void
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.userService.getCurrentUserInfo()
      .then(user => this.user = user);

    // 로그인/로그아웃 상태를 구독한다.
    this.authService.authStateUpdated$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((user: FirebaseUserModel) => this.user = user);
  }
}
