import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DaqApplicationTestModule } from '../../../test.module';
import { PropertyConfigModbusDetailComponent } from 'app/entities/property-config-modbus/property-config-modbus-detail.component';
import { PropertyConfigModbus } from 'app/shared/model/property-config-modbus.model';

describe('Component Tests', () => {
  describe('PropertyConfigModbus Management Detail Component', () => {
    let comp: PropertyConfigModbusDetailComponent;
    let fixture: ComponentFixture<PropertyConfigModbusDetailComponent>;
    const route = ({ data: of({ propertyConfigModbus: new PropertyConfigModbus(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DaqApplicationTestModule],
        declarations: [PropertyConfigModbusDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PropertyConfigModbusDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PropertyConfigModbusDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load propertyConfigModbus on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.propertyConfigModbus).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
