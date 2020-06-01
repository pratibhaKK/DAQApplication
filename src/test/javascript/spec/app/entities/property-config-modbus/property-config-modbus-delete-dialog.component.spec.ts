import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DaqApplicationTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { PropertyConfigModbusDeleteDialogComponent } from 'app/entities/property-config-modbus/property-config-modbus-delete-dialog.component';
import { PropertyConfigModbusService } from 'app/entities/property-config-modbus/property-config-modbus.service';

describe('Component Tests', () => {
  describe('PropertyConfigModbus Management Delete Component', () => {
    let comp: PropertyConfigModbusDeleteDialogComponent;
    let fixture: ComponentFixture<PropertyConfigModbusDeleteDialogComponent>;
    let service: PropertyConfigModbusService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DaqApplicationTestModule],
        declarations: [PropertyConfigModbusDeleteDialogComponent],
      })
        .overrideTemplate(PropertyConfigModbusDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PropertyConfigModbusDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PropertyConfigModbusService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
