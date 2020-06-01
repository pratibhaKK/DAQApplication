import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'device',
        loadChildren: () => import('./device/device.module').then(m => m.DaqApplicationDeviceModule),
      },
      {
        path: 'tag-master',
        loadChildren: () => import('./tag-master/tag-master.module').then(m => m.DaqApplicationTagMasterModule),
      },
      {
        path: 'template',
        loadChildren: () => import('./template/template.module').then(m => m.DaqApplicationTemplateModule),
      },
      {
        path: 'property',
        loadChildren: () => import('./property/property.module').then(m => m.DaqApplicationPropertyModule),
      },
      {
        path: 'property-config-modbus',
        loadChildren: () =>
          import('./property-config-modbus/property-config-modbus.module').then(m => m.DaqApplicationPropertyConfigModbusModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class DaqApplicationEntityModule {}
