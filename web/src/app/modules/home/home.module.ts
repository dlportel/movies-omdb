import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainHomeComponent} from './components/main-home/main-home.component';
import {RouterModule, Routes} from '@angular/router';
import {OmdbService} from '../../services/omdb.service';
import {MovieService} from '../../core/classes/movie.service';
import {MatSelectModule} from '@angular/material/select';
import {SharedModule} from '../../shared/shared.module';
import { ItemContainerComponent } from './mini-components/item-container/item-container.component';
import { ModalItemDetailsComponent } from './modals/modal-item-details/modal-item-details.component';

const routes: Routes = [
  {path: '', component: MainHomeComponent}
];

@NgModule({
  declarations: [MainHomeComponent, ItemContainerComponent, ModalItemDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSelectModule,
    SharedModule
  ],
  providers: [
    {provide: MovieService, useClass: OmdbService}
  ]
})
export class HomeModule {
}
