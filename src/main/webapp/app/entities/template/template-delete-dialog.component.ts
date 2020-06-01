import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITemplate } from 'app/shared/model/template.model';
import { TemplateService } from './template.service';

@Component({
  templateUrl: './template-delete-dialog.component.html',
})
export class TemplateDeleteDialogComponent {
  template?: ITemplate;

  constructor(protected templateService: TemplateService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.templateService.delete(id).subscribe(() => {
      this.eventManager.broadcast('templateListModification');
      this.activeModal.close();
    });
  }
}
