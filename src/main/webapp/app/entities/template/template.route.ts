import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITemplate, Template } from 'app/shared/model/template.model';
import { TemplateService } from './template.service';
import { TemplateComponent } from './template.component';
import { TemplateDetailComponent } from './template-detail.component';
import { TemplateUpdateComponent } from './template-update.component';

@Injectable({ providedIn: 'root' })
export class TemplateResolve implements Resolve<ITemplate> {
  constructor(private service: TemplateService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITemplate> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((template: HttpResponse<Template>) => {
          if (template.body) {
            return of(template.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Template());
  }
}

export const templateRoute: Routes = [
  {
    path: '',
    component: TemplateComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'daqApplicationApp.template.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TemplateDetailComponent,
    resolve: {
      template: TemplateResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'daqApplicationApp.template.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TemplateUpdateComponent,
    resolve: {
      template: TemplateResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'daqApplicationApp.template.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TemplateUpdateComponent,
    resolve: {
      template: TemplateResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'daqApplicationApp.template.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
