import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPropertyConfigModbus } from 'app/shared/model/property-config-modbus.model';
import { PropertyConfigModbusService } from './property-config-modbus.service';
import { PropertyConfigModbusDeleteDialogComponent } from './property-config-modbus-delete-dialog.component';

@Component({
  selector: 'jhi-property-config-modbus',
  templateUrl: './property-config-modbus.component.html',
})
export class PropertyConfigModbusComponent implements OnInit, OnDestroy {
  propertyConfigModbuses?: IPropertyConfigModbus[];
  eventSubscriber?: Subscription;

  constructor(
    protected propertyConfigModbusService: PropertyConfigModbusService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.propertyConfigModbusService
      .query()
      .subscribe((res: HttpResponse<IPropertyConfigModbus[]>) => (this.propertyConfigModbuses = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPropertyConfigModbuses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPropertyConfigModbus): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPropertyConfigModbuses(): void {
    this.eventSubscriber = this.eventManager.subscribe('propertyConfigModbusListModification', () => this.loadAll());
  }

  delete(propertyConfigModbus: IPropertyConfigModbus): void {
    const modalRef = this.modalService.open(PropertyConfigModbusDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.propertyConfigModbus = propertyConfigModbus;
  }
}
