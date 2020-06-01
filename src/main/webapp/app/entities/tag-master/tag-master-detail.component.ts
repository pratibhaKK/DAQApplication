import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITagMaster } from 'app/shared/model/tag-master.model';

@Component({
  selector: 'jhi-tag-master-detail',
  templateUrl: './tag-master-detail.component.html',
})
export class TagMasterDetailComponent implements OnInit {
  tagMaster: ITagMaster | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tagMaster }) => (this.tagMaster = tagMaster));
  }

  previousState(): void {
    window.history.back();
  }
}
