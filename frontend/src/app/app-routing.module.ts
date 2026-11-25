import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Arabic routes (default)
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
  { path: 'services', loadChildren: () => import('./pages/services/services.module').then(m => m.ServicesModule) },
  { path: 'detox', loadChildren: () => import('./pages/detox/detox.module').then(m => m.DetoxModule) },
  { path: 'team', loadChildren: () => import('./pages/team/team.module').then(m => m.TeamModule) },
  { path: 'journey', loadChildren: () => import('./pages/journey/journey.module').then(m => m.JourneyModule) },
  { path: 'family', loadChildren: () => import('./pages/family/family.module').then(m => m.FamilyModule) },
  { path: 'faq', loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqModule) },
  { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },

  // English routes with /en prefix
  { path: 'en', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'en/about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
  { path: 'en/services', loadChildren: () => import('./pages/services/services.module').then(m => m.ServicesModule) },
  { path: 'en/detox', loadChildren: () => import('./pages/detox/detox.module').then(m => m.DetoxModule) },
  { path: 'en/team', loadChildren: () => import('./pages/team/team.module').then(m => m.TeamModule) },
  { path: 'en/journey', loadChildren: () => import('./pages/journey/journey.module').then(m => m.JourneyModule) },
  { path: 'en/family', loadChildren: () => import('./pages/family/family.module').then(m => m.FamilyModule) },
  { path: 'en/faq', loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqModule) },
  { path: 'en/contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
