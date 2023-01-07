import { catchError, from } from 'rxjs';
import { tap } from 'rxjs';
import { environment } from './../environments/environment';
import { map, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { UtilService } from './util.service';
import { MessageService } from './message.service';

import { Hero } from './classes/hero';
import { HEROES } from '../app/mock-heroes';
import { BehaviorSubject, Observable } from 'rxjs';

// 낙관적 업데이트 (optimistic updates) 개선 : https://developers.google.com/codelabs/building-a-web-app-with-angular-and-firebase?hl=ko#11
// const getObservable = (collection: AngularFirestoreCollection<Task>) => {
//   const subject = new BehaviorSubject<Task[]>([]);
//   collection.valueChanges({ idField: 'id' }).subscribe((val: Task[]) => {
//     subject.next(val);
//   });
//   return subject;
// };

@Injectable({
  providedIn: 'root'
})
export class HeroFireService {

  private collectionName = 'heroes';
  private newHeroId = 11;
  hero$: Observable<Hero[]> | undefined;

  constructor(
    private firestore: AngularFirestore,
    private messageService: MessageService,
    private util: UtilService,
  ) {
    this.genId();
  }

  private genId() {
    this.firestore.collection<Hero>(
      this.collectionName,
      ref => ref.orderBy('id', 'desc').limit(1)
    ).snapshotChanges().subscribe(h => {
      if (h.length === 0) {
        // 데이터가 존재하지 않을 경우 MockData 입력
        HEROES.forEach(hero => this.updateHero(hero));
      }
      this.newHeroId = 0 < h.length ? h[0].payload.doc.data().id + 1 : 11;
      console.log(this.newHeroId);
    });
  }

  updateHero(hero: Hero): Observable<any> { // Promise<any> {
    return from( // promise to observable (TODO : 처음부터 observable 가능?)
      this.firestore.collection<Hero>(
        this.collectionName
      ).doc(hero.id.toString()).set(hero, { merge: true })
        .then(_ => {
          return new Promise<string>(re => re(hero.id.toString())); // of(hero).toPromise(); // @deprecated — Replaced with firstValueFrom and lastValueFrom . Will be removed in v8. Details: https://rxjs.dev/deprecations/to-promise
        })
        .catch(reason => {
          if (!environment.production) {
            console.error(reason);
          }
          this.util.handleErrorPromise<Hero>(this.updateHero.name, hero, this.log);
        })
        .finally(() => {
          this.log(`updated hero id=${hero.id}`);
        })
    );
  }

  private log(message: string) {
    this.messageService.add(`Hero-firebaseService: ${message}`);
  }

  getHeroes(): Observable<Hero[]> {
    return this.firestore.collection(
      this.collectionName
    ).get().pipe(
      map(snapshots => {
        return snapshots.docs.map(doc => {
          const hero = doc.data() as Hero;
          // console.log(hero);
          return hero;
        });
      }),
      tap(() => {
        this.log('fetched heroes');
      }),
      catchError(this.util.handleErrorObservable<Hero[]>(this.getHeroes.name, [], this.log))
    );
  }

  getHero(id: number): Observable<Hero> {
    return this.firestore.collection(
      this.collectionName
    ).doc(id.toString()).get().pipe(
      map(doc => {
        return doc.data() as Hero;
      }),
      tap(x => {
        this.log(`fetched hero id=${x.id}`);
      }),
      catchError(this.util.handleErrorObservable<Hero>(this.getHero.name, undefined, this.log))
    );
  }

  addHero(hero: Hero): Observable<any> { // Promise<any> { // Promise<Hero> {
    hero.id = this.newHeroId;

    return from( // promise to observable (TODO : 처음부터 observable 가능?)
      this.firestore.collection<Hero>(
        this.collectionName
      ).doc(hero.id.toString()).set(hero) // ).add(hero) << 자동id 부여됨.
        .then(_ => {
          return new Promise<Hero>(re => re(hero)); // of(hero).toPromise(); // @deprecated
        })
        .catch(this.util.handleErrorPromise<Hero>(this.addHero.name, hero, this.log))
        .finally(() => {
          this.log(`add hero id=${hero.id}`);
        })
    ); // as Promise<Hero>; << Promise<Hero> 일때

    /*
      // return Promise<Hero>
      this.heroService.addHero({ name } as Hero).then(
        hero => {
          this.heroes.push(hero);
        }
      );

      // return Promise<any>
      this.heroService.addHero({ name } as Hero).then(
        hero => {
          this.heroes.push(hero as Hero); // TODO: 검증
        }
      );

      // return Observable<any>
      this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero as Hero); // TODO: 검증
      });
     */
  }

  deleteHero(pHero: Hero | number): Observable<any> { // Promise<any> {
    const id = typeof pHero === 'number' ? pHero : pHero.id;
    const hero: Hero = typeof pHero === 'number' ? { id: pHero, name: 'deletedHero' } : pHero;

    return from( // promise to observable (TODO : 처음부터 observable 가능?)
      this.firestore.doc<Hero>(
        `${this.collectionName}/${id}`
      ).delete().then(_ => {
        return new Promise<Hero>(re => re(hero)); // of(hero).toPromise(); // @deprecated
      }).catch(this.util.handleErrorPromise<Hero>(this.deleteHero.name, hero, this.log))
        .finally(() => {
          this.log(`deleted hero id=${id}`);
        })
    );
  }


  /* firebase 기본제공 검색기능이 매우 미흡함. >> 보완방법 모색 */
  searchHeroes(term: string): Observable<Hero[]> {
    const termString = term.trim();
    const heroes: Hero[] = [];
    if (!termString.trim()) {
      return of(heroes);
    }

    const text = termString;
    const end = text.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));

    return this.firestore.collection(
      this.collectionName,
      query => query.orderBy('name', 'asc')
        .where('name', '>=', text).where('name', '<', end)
    ).get().pipe(
      map(snapshot => {
        return snapshot.docs.map(doc => {
          return doc.data() as Hero;
        });
      }),
      tap(rHeroes => {
        0 < rHeroes.length ?
          this.log(`found heroes matching "${termString}"`)
          : this.log(`no heroes matching "${termString}"`);
      }),
      catchError(this.util.handleErrorObservable<Hero[]>(this.searchHeroes.name, [], this.log))
    );
  }

}
