import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DaqApplicationTestModule } from '../../../test.module';
import { TemplateComponent } from 'app/entities/template/template.component';
import { TemplateService } from 'app/entities/template/template.service';
import { Template } from 'app/shared/model/template.model';

describe('Component Tests', () => {
  describe('Template Management Component', () => {
    let comp: TemplateComponent;
    let fixture: ComponentFixture<TemplateComponent>;
    let service: TemplateService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DaqApplicationTestModule],
        declarations: [TemplateComponent],
      })
        .overrideTemplate(TemplateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TemplateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TemplateService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Template(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.templates && comp.templates[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
