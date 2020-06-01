import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DaqApplicationTestModule } from '../../../test.module';
import { TagMasterDetailComponent } from 'app/entities/tag-master/tag-master-detail.component';
import { TagMaster } from 'app/shared/model/tag-master.model';

describe('Component Tests', () => {
  describe('TagMaster Management Detail Component', () => {
    let comp: TagMasterDetailComponent;
    let fixture: ComponentFixture<TagMasterDetailComponent>;
    const route = ({ data: of({ tagMaster: new TagMaster(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DaqApplicationTestModule],
        declarations: [TagMasterDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TagMasterDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TagMasterDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tagMaster on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tagMaster).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
