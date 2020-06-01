import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPropertyConfigModbus } from 'app/shared/model/property-config-modbus.model';

@Component({
  selector: 'jhi-property-config-modbus-detail',
  templateUrl: './property-config-modbus-detail.component.html',
})
export class PropertyConfigModbusDetailComponent implements OnInit {
  propertyConfigModbus: IPropertyConfigModbus | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ propertyConfigModbus }) => (this.propertyConfigModbus = propertyConfigModbus));
  }

  previousState(): void {
    window.history.back();
  }
}
