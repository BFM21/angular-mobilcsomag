import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import {MatListModule} from '@angular/material/list';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    
    MatListModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({"projectId":"angular-mobilcsomag","appId":"1:281224202241:web:2778a109a80441e8b91800","databaseURL":"https://angular-mobilcsomag-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"angular-mobilcsomag.appspot.com","apiKey":"AIzaSyA8o_A4zXaw2xpqvBW_sfEgbUffosq_FdU","authDomain":"angular-mobilcsomag.firebaseapp.com","messagingSenderId":"281224202241","measurementId":"G-42YZDBXY00"}),
    //provideFirebaseApp(() => initializeApp({"projectId":"angular-mobilcsomag","appId":"1:281224202241:web:2778a109a80441e8b91800","databaseURL":"https://angular-mobilcsomag-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"angular-mobilcsomag.appspot.com","apiKey":"AIzaSyA8o_A4zXaw2xpqvBW_sfEgbUffosq_FdU","authDomain":"angular-mobilcsomag.firebaseapp.com","messagingSenderId":"281224202241","measurementId":"G-42YZDBXY00"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [
    AuthService,
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


