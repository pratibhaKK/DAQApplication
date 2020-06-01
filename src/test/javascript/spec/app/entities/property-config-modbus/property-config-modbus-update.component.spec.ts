import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DaqApplicationTestModule } from '../../../test.module';
import { PropertyConfigModbusUpdateComponent } from 'app/entities/property-config-modbus/property-config-modbus-update.component';
import { PropertyConfigModbusService } from 'app/entities/property-config-modbus/property-config-modbus.service';
import { PropertyConfigModbus } from 'app/shared/model/property-config-modbus.model';

describe('Component Tests', () => {
  describe('PropertyConfigModbus Management Update Component', () => {
    let comp: PropertyConfigModbusUpdateComponent;
    let fixture: ComponentFixture<PropertyConfigModbusUpdateComponent>;
    let service: PropertyConfigModbusService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DaqApplicationTestModule],
        declarations: [PropertyConfigModbusUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PropertyConfigModbusUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PropertyConfigModbusUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PropertyConfigModbusService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PropertyConfigModbus(123);
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
        const entity = new PropertyConfigModbus();
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
