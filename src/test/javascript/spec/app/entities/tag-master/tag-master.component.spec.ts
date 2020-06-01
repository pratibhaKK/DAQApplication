import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DaqApplicationTestModule } from '../../../test.module';
import { TagMasterComponent } from 'app/entities/tag-master/tag-master.component';
import { TagMasterService } from 'app/entities/tag-master/tag-master.service';
import { TagMaster } from 'app/shared/model/tag-master.model';

describe('Component Tests', () => {
  describe('TagMaster Management Component', () => {
    let comp: TagMasterComponent;
    let fixture: ComponentFixture<TagMasterComponent>;
    let service: TagMasterService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DaqApplicationTestModule],
        declarations: [TagMasterComponent],
      })
        .overrideTemplate(TagMasterComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TagMasterComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TagMasterService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TagMaster(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tagMasters && comp.tagMasters[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
