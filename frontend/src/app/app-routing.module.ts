import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroPageComponent } from './main-frame/intro-page/intro-page.component';

const routes: Routes = [
  { path: '', component: IntroPageComponent},
  //----Lazy-Loading----///
  { path: 'Auth', loadChildren: () => import('./user-access/user-access/user-access.module')
    .then(lazyLoading => lazyLoading.UserAccessModule)
  },
  { path: 'content', 
          loadChildren: () => import('./main-content/content-model/content-model.module')
            .then(lazyLoading => lazyLoading.ContentModelModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
