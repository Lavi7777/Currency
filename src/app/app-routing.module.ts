import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyMainComponent } from '../app/pages/currency-main/currency-main.component';

const routes: Routes = [{ path: '', component: CurrencyMainComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
