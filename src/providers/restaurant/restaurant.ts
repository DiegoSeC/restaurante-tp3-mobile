import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable()
export class Restaurant {

  constructor(public api: Api) { }

  getWaybills() {
    return this.api.get('carriers/15cb35c0-65f6-3687-974e-87e3259c059a/waybills');
  }

  updateWaybill(waybill: any) {
    return this.api.patch(`waybills/${waybill.uuid}`, {
      delivery_status: waybill.delivery_status,
      status: waybill.delivery_status,
      comment: waybill.comment
    });
  }

}
