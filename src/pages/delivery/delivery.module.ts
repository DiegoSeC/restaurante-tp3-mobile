import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { DeliveryPage } from './delivery';

@NgModule({
  declarations: [
    DeliveryPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryPage),
    TranslateModule.forChild()
  ],
  exports: [
    DeliveryPage
  ]
})
export class DeliveryPageModule { }
