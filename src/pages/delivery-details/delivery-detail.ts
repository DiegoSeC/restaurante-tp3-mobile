import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions
} from '@ionic-native/google-maps';

import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Restaurant } from '../../providers/providers';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-delivery-detail',
  templateUrl: 'delivery-detail.html'
})
export class DeliveryDetailPage {

  public waybill: any;
  public map: GoogleMap;
  public buttonText: string;

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    public restaurant: Restaurant,
    private googleMaps: GoogleMaps,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController) {
      this.waybill = this.navParams.get('waybill');
      this.buttonText = (this.waybill.delivery_status === 'En Ruta')
        ? 'Finalizar' : 'Iniciar';
  }

  ionViewDidLoad() {
   this.loadMap();
  }

  showPrompt(title: string, message: string, status: string) {
    if (this.buttonText === 'Iniciar') {
      this.waybill.delivery_status = 'En Ruta';
      this.buttonText = 'Finalizar';
      this.restaurant.updateWaybill(this.waybill).subscribe(data => console.log(data));
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
            this.waybill.delivery_status = status;
            this.waybill.comment = data.observacion;
            this.restaurant.updateWaybill(this.waybill).subscribe(data => console.log(data));
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

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    let element: HTMLElement = document.getElementById('map');

    this.map = this.googleMaps.create(element, mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: 43.0741904,
              lng: -89.3809802
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }



}
