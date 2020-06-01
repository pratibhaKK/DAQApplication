import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITagMaster, TagMaster } from 'app/shared/model/tag-master.model';
import { TagMasterService } from './tag-master.service';

@Component({
  selector: 'jhi-tag-master-update',
  templateUrl: './tag-master-update.component.html',
})
export class TagMasterUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    tagId: [],
    tagName: [],
    description: [],
  });

  constructor(protected tagMasterService: TagMasterService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tagMaster }) => {
      this.updateForm(tagMaster);
    });
  }

  updateForm(tagMaster: ITagMaster): void {
    this.editForm.patchValue({
      id: tagMaster.id,
      tagId: tagMaster.tagId,
      tagName: tagMaster.tagName,
      description: tagMaster.description,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tagMaster = this.createFromForm();
    if (tagMaster.id !== undefined) {
      this.subscribeToSaveResponse(this.tagMasterService.update(tagMaster));
    } else {
      this.subscribeToSaveResponse(this.tagMasterService.create(tagMaster));
    }
  }

  private createFromForm(): ITagMaster {
    return {
      ...new TagMaster(),
      id: this.editForm.get(['id'])!.value,
      tagId: this.editForm.get(['tagId'])!.value,
      tagName: this.editForm.get(['tagName'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITagMaster>>): void {
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
}
