import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITagMaster } from 'app/shared/model/tag-master.model';
import { TagMasterService } from './tag-master.service';

@Component({
  templateUrl: './tag-master-delete-dialog.component.html',
})
export class TagMasterDeleteDialogComponent {
  tagMaster?: ITagMaster;

  constructor(protected tagMasterService: TagMasterService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tagMasterService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tagMasterListModification');
      this.activeModal.close();
    });
  }
}
