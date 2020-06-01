import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPropertyConfigModbus } from 'app/shared/model/property-config-modbus.model';
import { PropertyConfigModbusService } from './property-config-modbus.service';

@Component({
  templateUrl: './property-config-modbus-delete-dialog.component.html',
})
export class PropertyConfigModbusDeleteDialogComponent {
  propertyConfigModbus?: IPropertyConfigModbus;

  constructor(
    protected propertyConfigModbusService: PropertyConfigModbusService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.propertyConfigModbusService.delete(id).subscribe(() => {
      this.eventManager.broadcast('propertyConfigModbusListModification');
      this.activeModal.close();
    });
  }
}
