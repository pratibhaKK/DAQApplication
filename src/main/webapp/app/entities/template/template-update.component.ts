import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ITemplate, Template } from 'app/shared/model/template.model';
import { TemplateService } from './template.service';
import { IDevice } from 'app/shared/model/device.model';
import { DeviceService } from 'app/entities/device/device.service';

@Component({
  selector: 'jhi-template-update',
  templateUrl: './template-update.component.html',
})
export class TemplateUpdateComponent implements OnInit {
  isSaving = false;
  devices: IDevice[] = [];

  editForm = this.fb.group({
    id: [],
    templateName: [],
    description: [],
    protocolSupported: [],
    device: [],
  });

  constructor(
    protected templateService: TemplateService,
    protected deviceService: DeviceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ template }) => {
      this.updateForm(template);

      this.deviceService
        .query({ filter: 'template-is-null' })
        .pipe(
          map((res: HttpResponse<IDevice[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDevice[]) => {
          if (!template.device || !template.device.id) {
            this.devices = resBody;
          } else {
            this.deviceService
              .find(template.device.id)
              .pipe(
                map((subRes: HttpResponse<IDevice>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDevice[]) => (this.devices = concatRes));
          }
        });
    });
  }

  updateForm(template: ITemplate): void {
    this.editForm.patchValue({
      id: template.id,
      templateName: template.templateName,
      description: template.description,
      protocolSupported: template.protocolSupported,
      device: template.device,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const template = this.createFromForm();
    if (template.id !== undefined) {
      this.subscribeToSaveResponse(this.templateService.update(template));
    } else {
      this.subscribeToSaveResponse(this.templateService.create(template));
    }
  }

  private createFromForm(): ITemplate {
    return {
      ...new Template(),
      id: this.editForm.get(['id'])!.value,
      templateName: this.editForm.get(['templateName'])!.value,
      description: this.editForm.get(['description'])!.value,
      protocolSupported: this.editForm.get(['protocolSupported'])!.value,
      device: this.editForm.get(['device'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITemplate>>): void {
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

  trackById(index: number, item: IDevice): any {
    return item.id;
  }
}
