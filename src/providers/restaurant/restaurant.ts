import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable()
export class Restaurant {

  constructor(public api: Api) { }

  getWaybills() {
    return this.api.get('carriers/9280d751-d37d-3846-b11c-855cffefef98/waybills');
  }

  updateWaybill(waybill: any) {
    return this.api.put(`waybills/${waybill.uuid}`, {
      delivery_status: waybill.delivery_status,
      status: waybill.status,
      comment: waybill.comment
    });
  }

}
