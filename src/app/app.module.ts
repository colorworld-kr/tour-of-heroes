import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './services/in-memory-data.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

import { SampleNavComponent } from './sample/__sample-nav/sample-nav.component';
import { OnChangeChildComponent } from './sample/on-change/on-change-child/on-change-child.component';
import { OnChangeParentComponent } from './sample/on-change/on-change-parent/on-change-parent.component';
import { CountClicksDirective } from './sample/custom-event/count-clicks.directive';
import { HostListenerSampleComponent } from './sample/custom-event/host-listener-sample/host-listener-sample.component';
import { EventEmitterSampleComponent } from './sample/custom-event/event-emitter-sample/event-emitter-sample.component';
import { CustomEventComponent } from './sample/custom-event/custom-event/custom-event.component';

import { HeroesComponent } from './components/hero-list/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { MessagesComponent } from './components-shared/messages/messages.component';
import { AppRoutingModule } from './modules/app-routing.module';
import { SampleRoutingModule } from './modules/sample-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroSearchComponent } from './components-shared/hero-search/hero-search.component';
import { HeroDetailViewComponent } from './components/hero-detail-viewer/hero-detail-view.component';
import { AttachmentListComponent } from './components-shared/attachment-list/attachment-list.component';
import { AttachmentUploadComponent } from './components-shared/attachment-upload/attachment-upload.component';
import { AttachmentListContainerComponent } from './components/attachment-list-container/attachment-list-container.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    AppComponent,

    // sample component list
    SampleNavComponent,
    OnChangeChildComponent,
    OnChangeParentComponent,
    CountClicksDirective,
    HostListenerSampleComponent,
    EventEmitterSampleComponent,
    CustomEventComponent,

    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    HeroDetailViewComponent,
    AttachmentListComponent,
    AttachmentUploadComponent,
    AttachmentListContainerComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SampleRoutingModule,
    HttpClientModule,

    // HttpClientInMemoryWebApiModule ????????? HTTP ????????? ???????????? ????????? ????????? ???????????????.
    // ?????? ????????? ???????????? ??? ????????? ???????????? ?????????.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),

    // firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
