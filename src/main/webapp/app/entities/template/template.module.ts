import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DaqApplicationSharedModule } from 'app/shared/shared.module';
import { TemplateComponent } from './template.component';
import { TemplateDetailComponent } from './template-detail.component';
import { TemplateUpdateComponent } from './template-update.component';
import { TemplateDeleteDialogComponent } from './template-delete-dialog.component';
import { templateRoute } from './template.route';

@NgModule({
  imports: [DaqApplicationSharedModule, RouterModule.forChild(templateRoute)],
  declarations: [TemplateComponent, TemplateDetailComponent, TemplateUpdateComponent, TemplateDeleteDialogComponent],
  entryComponents: [TemplateDeleteDialogComponent],
})
export class DaqApplicationTemplateModule {}
