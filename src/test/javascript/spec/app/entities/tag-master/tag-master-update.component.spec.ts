import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DaqApplicationTestModule } from '../../../test.module';
import { TagMasterUpdateComponent } from 'app/entities/tag-master/tag-master-update.component';
import { TagMasterService } from 'app/entities/tag-master/tag-master.service';
import { TagMaster } from 'app/shared/model/tag-master.model';

describe('Component Tests', () => {
  describe('TagMaster Management Update Component', () => {
    let comp: TagMasterUpdateComponent;
    let fixture: ComponentFixture<TagMasterUpdateComponent>;
    let service: TagMasterService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DaqApplicationTestModule],
        declarations: [TagMasterUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TagMasterUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TagMasterUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TagMasterService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TagMaster(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TagMaster();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
