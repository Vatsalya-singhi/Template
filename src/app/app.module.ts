import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { FakeDbService } from 'app/fake-db/fake-db.service';
import { AppComponent } from 'app/app.component';
import { AppStoreModule } from 'app/store/store.module';
import { LayoutModule } from 'app/layout/layout.module';
import { environment } from '../environments/environment';
//firestore
import { AngularFireModule } from 'angularfire2';
import { auth } from 'firebase/app';
import { FireauthService } from '../app/services/fireauth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthGuard } from './services/auth.guard';
//---------
const appRoutes: Routes = [
    {
        path      : 'dashboard',
        loadChildren: './main/apps/apps.module#AppsModule',
        //canActivate : [AuthGuard]
    },
    {
        path        : 'apps',
        loadChildren: './main/apps/apps.module#AppsModule',
        canActivate : [AuthGuard]
    },
    {
        path        : 'pages',
        loadChildren: './main/pages/pages.module#PagesModule',
        canActivate : [AuthGuard]
    },
    {
        path        : 'ui',
        loadChildren: './main/ui/ui.module#UIModule',
        canActivate : [AuthGuard]
    },
    {
        path        : 'documentation',
        loadChildren: './main/documentation/documentation.module#DocumentationModule',
        canActivate : [AuthGuard]
    },
    {
        path        : 'angular-material-elements',
        loadChildren: './main/angular-material-elements/angular-material-elements.module#AngularMaterialElementsModule',
        canActivate : [AuthGuard]
    },
    {
        path      : 'getlogin', // was **
        loadChildren: './main/pages/authentication/login/login.module#LoginModule',
    },
    /*
    {
        path      : 'getprofile', // was **
        //loadChildren: './main/pages/profile/profile.module#ProfileModule',
        //loadChildren: './main/apps/apps.module#AppsModule',
        loadChildren: './main/apps/calendar/calendar/module#CalendarModule',
        canActivate : [AuthGuard]
    },*/
    {   
        path: '',   
        redirectTo: 'apps/dashboards/analytics', 
        pathMatch: 'full',
        //canActivate : [AuthGuard]  doesnt get called anyways
    },
    /*
    {
        path      : '**',
        redirectTo: 'apps/dashboards/analytics',
        //canActivate : [AuthGuard]
    }*/
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, {enableTracing: true}),
        
        AngularFireModule.initializeApp(environment.firebaseConfig),

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        AppStoreModule,
        
        //Firebase 
        AngularFireAuthModule,
        AngularFirestoreModule
    ],
    providers: [
        FireauthService
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
