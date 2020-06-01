import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DaqApplicationSharedModule } from 'app/shared/shared.module';
import { PropertyConfigModbusComponent } from './property-config-modbus.component';
import { PropertyConfigModbusDetailComponent } from './property-config-modbus-detail.component';
import { PropertyConfigModbusUpdateComponent } from './property-config-modbus-update.component';
import { PropertyConfigModbusDeleteDialogComponent } from './property-config-modbus-delete-dialog.component';
import { propertyConfigModbusRoute } from './property-config-modbus.route';

@NgModule({
  imports: [DaqApplicationSharedModule, RouterModule.forChild(propertyConfigModbusRoute)],
  declarations: [
    PropertyConfigModbusComponent,
    PropertyConfigModbusDetailComponent,
    PropertyConfigModbusUpdateComponent,
    PropertyConfigModbusDeleteDialogComponent,
  ],
  entryComponents: [PropertyConfigModbusDeleteDialogComponent],
})
export class DaqApplicationPropertyConfigModbusModule {}
