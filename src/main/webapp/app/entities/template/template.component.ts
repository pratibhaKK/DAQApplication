import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITemplate } from 'app/shared/model/template.model';
import { TemplateService } from './template.service';
import { TemplateDeleteDialogComponent } from './template-delete-dialog.component';

@Component({
  selector: 'jhi-template',
  templateUrl: './template.component.html',
})
export class TemplateComponent implements OnInit, OnDestroy {
  templates?: ITemplate[];
  eventSubscriber?: Subscription;

  constructor(protected templateService: TemplateService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.templateService.query().subscribe((res: HttpResponse<ITemplate[]>) => (this.templates = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTemplates();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITemplate): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTemplates(): void {
    this.eventSubscriber = this.eventManager.subscribe('templateListModification', () => this.loadAll());
  }

  delete(template: ITemplate): void {
    const modalRef = this.modalService.open(TemplateDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.template = template;
  }
}
