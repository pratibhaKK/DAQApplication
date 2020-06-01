import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DaqApplicationTestModule } from '../../../test.module';
import { PropertyConfigModbusComponent } from 'app/entities/property-config-modbus/property-config-modbus.component';
import { PropertyConfigModbusService } from 'app/entities/property-config-modbus/property-config-modbus.service';
import { PropertyConfigModbus } from 'app/shared/model/property-config-modbus.model';

describe('Component Tests', () => {
  describe('PropertyConfigModbus Management Component', () => {
    let comp: PropertyConfigModbusComponent;
    let fixture: ComponentFixture<PropertyConfigModbusComponent>;
    let service: PropertyConfigModbusService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DaqApplicationTestModule],
        declarations: [PropertyConfigModbusComponent],
      })
        .overrideTemplate(PropertyConfigModbusComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PropertyConfigModbusComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PropertyConfigModbusService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PropertyConfigModbus(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.propertyConfigModbuses && comp.propertyConfigModbuses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
