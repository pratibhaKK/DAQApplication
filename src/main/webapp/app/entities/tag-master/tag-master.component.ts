import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITagMaster } from 'app/shared/model/tag-master.model';
import { TagMasterService } from './tag-master.service';
import { TagMasterDeleteDialogComponent } from './tag-master-delete-dialog.component';

@Component({
  selector: 'jhi-tag-master',
  templateUrl: './tag-master.component.html',
})
export class TagMasterComponent implements OnInit, OnDestroy {
  tagMasters?: ITagMaster[];
  eventSubscriber?: Subscription;

  constructor(protected tagMasterService: TagMasterService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.tagMasterService.query().subscribe((res: HttpResponse<ITagMaster[]>) => (this.tagMasters = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTagMasters();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITagMaster): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTagMasters(): void {
    this.eventSubscriber = this.eventManager.subscribe('tagMasterListModification', () => this.loadAll());
  }

  delete(tagMaster: ITagMaster): void {
    const modalRef = this.modalService.open(TagMasterDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tagMaster = tagMaster;
  }
}
