import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITagMaster, TagMaster } from 'app/shared/model/tag-master.model';
import { TagMasterService } from './tag-master.service';
import { TagMasterComponent } from './tag-master.component';
import { TagMasterDetailComponent } from './tag-master-detail.component';
import { TagMasterUpdateComponent } from './tag-master-update.component';

@Injectable({ providedIn: 'root' })
export class TagMasterResolve implements Resolve<ITagMaster> {
  constructor(private service: TagMasterService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITagMaster> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tagMaster: HttpResponse<TagMaster>) => {
          if (tagMaster.body) {
            return of(tagMaster.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TagMaster());
  }
}

export const tagMasterRoute: Routes = [
  {
    path: '',
    component: TagMasterComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'daqApplicationApp.tagMaster.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TagMasterDetailComponent,
    resolve: {
      tagMaster: TagMasterResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'daqApplicationApp.tagMaster.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TagMasterUpdateComponent,
    resolve: {
      tagMaster: TagMasterResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'daqApplicationApp.tagMaster.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TagMasterUpdateComponent,
    resolve: {
      tagMaster: TagMasterResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'daqApplicationApp.tagMaster.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
