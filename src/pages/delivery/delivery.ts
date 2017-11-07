import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Restaurant } from '../../providers/providers';

import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html'
})
export class DeliveryPage {

  public waybills: any;
  public originalWaybills: any;

  constructor(public navCtrl: NavController,
            public restaurant: Restaurant,
            public alertCtrl: AlertController,
            private toastCtrl: ToastController) {
    this.getDelivery();
  }

  getDelivery() {
    this.restaurant.getWaybills().subscribe(
      (res: any) => this.waybills = res.data
    );
  }

  updateModel(index: number) {
    this.waybills[index].checked = true;
  }

  filterItems(ev: any) {
    this.setWayBills();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.waybills = this.waybills.filter(function(waybill) {
        return waybill.document_number.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  goTo(waybill: any) {
    this.navCtrl.push('DeliveryDetailPage', {waybill: waybill});
  }

  changeStatus(status: string, observacion = '') {
    this.waybills = this.waybills.map(waybill => {
      if(waybill.checked === true) {
        waybill.delivery_status = status;
        waybill.comment = observacion;
      }

      return waybill;
    });
  }

  promptWaybills(status: string, title: string, message: string) {
    let showPrompt = this.waybills.filter(waybill => waybill.checked === true);

    if(showPrompt.length === 0) {
      return null;
    }

    let prompt = this.alertCtrl.create({
      title: `${title} Entrega`,
      message: "Observacion",
      inputs: [
        {
          name: 'observacion',
          placeholder: 'Observacion'
        },
      ],
      buttons: [
        {
          text: 'Atras',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: title,
          handler: data => {
            this.changeStatus(status, data.observacion);
            this.presentToast(message);
          }
        }
      ]
    });

    prompt.present();
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  setWayBills() {
    if(typeof this.originalWaybills === 'undefined' &&
       typeof this.waybills !== 'undefined') {
      this.originalWaybills = this.waybills;
    }

    this.waybills = this.originalWaybills;
  }
}
