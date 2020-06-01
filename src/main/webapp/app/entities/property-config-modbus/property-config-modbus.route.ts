import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPropertyConfigModbus, PropertyConfigModbus } from 'app/shared/model/property-config-modbus.model';
import { PropertyConfigModbusService } from './property-config-modbus.service';
import { PropertyConfigModbusComponent } from './property-config-modbus.component';
import { PropertyConfigModbusDetailComponent } from './property-config-modbus-detail.component';
import { PropertyConfigModbusUpdateComponent } from './property-config-modbus-update.component';

@Injectable({ providedIn: 'root' })
export class PropertyConfigModbusResolve implements Resolve<IPropertyConfigModbus> {
  constructor(private service: PropertyConfigModbusService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPropertyConfigModbus> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((propertyConfigModbus: HttpResponse<PropertyConfigModbus>) => {
          if (propertyConfigModbus.body) {
            return of(propertyConfigModbus.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PropertyConfigModbus());
  }
}

export const propertyConfigModbusRoute: Routes = [
  {
    path: '',
    component: PropertyConfigModbusComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'daqApplicationApp.propertyConfigModbus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PropertyConfigModbusDetailComponent,
    resolve: {
      propertyConfigModbus: PropertyConfigModbusResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'daqApplicationApp.propertyConfigModbus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PropertyConfigModbusUpdateComponent,
    resolve: {
      propertyConfigModbus: PropertyConfigModbusResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'daqApplicationApp.propertyConfigModbus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PropertyConfigModbusUpdateComponent,
    resolve: {
      propertyConfigModbus: PropertyConfigModbusResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'daqApplicationApp.propertyConfigModbus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
