import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProperty, Property } from 'app/shared/model/property.model';
import { PropertyService } from './property.service';
import { ITagMaster } from 'app/shared/model/tag-master.model';
import { TagMasterService } from 'app/entities/tag-master/tag-master.service';
import { ITemplate } from 'app/shared/model/template.model';
import { TemplateService } from 'app/entities/template/template.service';

type SelectableEntity = ITagMaster | ITemplate;

@Component({
  selector: 'jhi-property-update',
  templateUrl: './property-update.component.html',
})
export class PropertyUpdateComponent implements OnInit {
  isSaving = false;
  tagids: ITagMaster[] = [];
  templateids: ITemplate[] = [];
  templates: ITemplate[] = [];

  editForm = this.fb.group({
    id: [],
    uom: [],
    controlledTag: [],
    pollInterval: [],
    tagId: [],
    templateId: [],
    properties: [],
  });

  constructor(
    protected propertyService: PropertyService,
    protected tagMasterService: TagMasterService,
    protected templateService: TemplateService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ property }) => {
      this.updateForm(property);

      this.tagMasterService
        .query({ filter: 'property-is-null' })
        .pipe(
          map((res: HttpResponse<ITagMaster[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ITagMaster[]) => {
          if (!property.tagId || !property.tagId.id) {
            this.tagids = resBody;
          } else {
            this.tagMasterService
              .find(property.tagId.id)
              .pipe(
                map((subRes: HttpResponse<ITagMaster>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ITagMaster[]) => (this.tagids = concatRes));
          }
        });

      this.templateService
        .query({ filter: 'property-is-null' })
        .pipe(
          map((res: HttpResponse<ITemplate[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ITemplate[]) => {
          if (!property.templateId || !property.templateId.id) {
            this.templateids = resBody;
          } else {
            this.templateService
              .find(property.templateId.id)
              .pipe(
                map((subRes: HttpResponse<ITemplate>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ITemplate[]) => (this.templateids = concatRes));
          }
        });

      this.templateService.query().subscribe((res: HttpResponse<ITemplate[]>) => (this.templates = res.body || []));
    });
  }

  updateForm(property: IProperty): void {
    this.editForm.patchValue({
      id: property.id,
      uom: property.uom,
      controlledTag: property.controlledTag,
      pollInterval: property.pollInterval,
      tagId: property.tagId,
      templateId: property.templateId,
      properties: property.properties,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const property = this.createFromForm();
    if (property.id !== undefined) {
      this.subscribeToSaveResponse(this.propertyService.update(property));
    } else {
      this.subscribeToSaveResponse(this.propertyService.create(property));
    }
  }

  private createFromForm(): IProperty {
    return {
      ...new Property(),
      id: this.editForm.get(['id'])!.value,
      uom: this.editForm.get(['uom'])!.value,
      controlledTag: this.editForm.get(['controlledTag'])!.value,
      pollInterval: this.editForm.get(['pollInterval'])!.value,
      tagId: this.editForm.get(['tagId'])!.value,
      templateId: this.editForm.get(['templateId'])!.value,
      properties: this.editForm.get(['properties'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProperty>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
