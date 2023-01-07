import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgSelectModule } from "@ng-select/ng-select";

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';

import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "src/app/services-local/in-memory-data.service";
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './modules/app-routing.module';

import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { MessagesComponent } from './components-shared/messages/messages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroSearchComponent } from './components-shared/hero-search/hero-search.component';
import { HeroSearchNewComponent } from './components-shared/hero-search-new/hero-search-new.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    HeroSearchNewComponent,
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
