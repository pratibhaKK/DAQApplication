import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPropertyConfigModbus, PropertyConfigModbus } from 'app/shared/model/property-config-modbus.model';
import { PropertyConfigModbusService } from './property-config-modbus.service';
import { ITagMaster } from 'app/shared/model/tag-master.model';
import { TagMasterService } from 'app/entities/tag-master/tag-master.service';
import { ITemplate } from 'app/shared/model/template.model';
import { TemplateService } from 'app/entities/template/template.service';

type SelectableEntity = ITagMaster | ITemplate;

@Component({
  selector: 'jhi-property-config-modbus-update',
  templateUrl: './property-config-modbus-update.component.html',
})
export class PropertyConfigModbusUpdateComponent implements OnInit {
  isSaving = false;
  tags: ITagMaster[] = [];
  templateids: ITemplate[] = [];
  templates: ITemplate[] = [];

  editForm = this.fb.group({
    id: [],
    uom: [],
    controlledTag: [],
    register: [],
    slaveId: [],
    count: [],
    mask: [],
    pollInterval: [],
    tag: [],
    templateId: [],
    propertiesModbus: [],
  });

  constructor(
    protected propertyConfigModbusService: PropertyConfigModbusService,
    protected tagMasterService: TagMasterService,
    protected templateService: TemplateService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ propertyConfigModbus }) => {
      this.updateForm(propertyConfigModbus);

      this.tagMasterService
        .query({ filter: 'propertyconfigmodbus-is-null' })
        .pipe(
          map((res: HttpResponse<ITagMaster[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ITagMaster[]) => {
          if (!propertyConfigModbus.tag || !propertyConfigModbus.tag.id) {
            this.tags = resBody;
          } else {
            this.tagMasterService
              .find(propertyConfigModbus.tag.id)
              .pipe(
                map((subRes: HttpResponse<ITagMaster>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ITagMaster[]) => (this.tags = concatRes));
          }
        });

      this.templateService
        .query({ filter: 'propertyconfigmodbus-is-null' })
        .pipe(
          map((res: HttpResponse<ITemplate[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ITemplate[]) => {
          if (!propertyConfigModbus.templateId || !propertyConfigModbus.templateId.id) {
            this.templateids = resBody;
          } else {
            this.templateService
              .find(propertyConfigModbus.templateId.id)
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

  updateForm(propertyConfigModbus: IPropertyConfigModbus): void {
    this.editForm.patchValue({
      id: propertyConfigModbus.id,
      uom: propertyConfigModbus.uom,
      controlledTag: propertyConfigModbus.controlledTag,
      register: propertyConfigModbus.register,
      slaveId: propertyConfigModbus.slaveId,
      count: propertyConfigModbus.count,
      mask: propertyConfigModbus.mask,
      pollInterval: propertyConfigModbus.pollInterval,
      tag: propertyConfigModbus.tag,
      templateId: propertyConfigModbus.templateId,
      propertiesModbus: propertyConfigModbus.propertiesModbus,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const propertyConfigModbus = this.createFromForm();
    if (propertyConfigModbus.id !== undefined) {
      this.subscribeToSaveResponse(this.propertyConfigModbusService.update(propertyConfigModbus));
    } else {
      this.subscribeToSaveResponse(this.propertyConfigModbusService.create(propertyConfigModbus));
    }
  }

  private createFromForm(): IPropertyConfigModbus {
    return {
      ...new PropertyConfigModbus(),
      id: this.editForm.get(['id'])!.value,
      uom: this.editForm.get(['uom'])!.value,
      controlledTag: this.editForm.get(['controlledTag'])!.value,
      register: this.editForm.get(['register'])!.value,
      slaveId: this.editForm.get(['slaveId'])!.value,
      count: this.editForm.get(['count'])!.value,
      mask: this.editForm.get(['mask'])!.value,
      pollInterval: this.editForm.get(['pollInterval'])!.value,
      tag: this.editForm.get(['tag'])!.value,
      templateId: this.editForm.get(['templateId'])!.value,
      propertiesModbus: this.editForm.get(['propertiesModbus'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPropertyConfigModbus>>): void {
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
