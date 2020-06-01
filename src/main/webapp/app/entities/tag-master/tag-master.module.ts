import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DaqApplicationSharedModule } from 'app/shared/shared.module';
import { TagMasterComponent } from './tag-master.component';
import { TagMasterDetailComponent } from './tag-master-detail.component';
import { TagMasterUpdateComponent } from './tag-master-update.component';
import { TagMasterDeleteDialogComponent } from './tag-master-delete-dialog.component';
import { tagMasterRoute } from './tag-master.route';

@NgModule({
  imports: [DaqApplicationSharedModule, RouterModule.forChild(tagMasterRoute)],
  declarations: [TagMasterComponent, TagMasterDetailComponent, TagMasterUpdateComponent, TagMasterDeleteDialogComponent],
  entryComponents: [TagMasterDeleteDialogComponent],
})
export class DaqApplicationTagMasterModule {}
