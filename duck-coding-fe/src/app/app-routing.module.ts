import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentListPageComponent } from './document-list-page/document-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentListPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
