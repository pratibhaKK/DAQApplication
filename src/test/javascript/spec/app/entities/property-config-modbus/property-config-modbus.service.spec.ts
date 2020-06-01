import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PropertyConfigModbusService } from 'app/entities/property-config-modbus/property-config-modbus.service';
import { IPropertyConfigModbus, PropertyConfigModbus } from 'app/shared/model/property-config-modbus.model';

describe('Service Tests', () => {
  describe('PropertyConfigModbus Service', () => {
    let injector: TestBed;
    let service: PropertyConfigModbusService;
    let httpMock: HttpTestingController;
    let elemDefault: IPropertyConfigModbus;
    let expectedResult: IPropertyConfigModbus | IPropertyConfigModbus[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PropertyConfigModbusService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new PropertyConfigModbus(0, 'AAAAAAA', false, 0, 0, 0, 'AAAAAAA', 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a PropertyConfigModbus', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new PropertyConfigModbus()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PropertyConfigModbus', () => {
        const returnedFromService = Object.assign(
          {
            uom: 'BBBBBB',
            controlledTag: true,
            register: 1,
            slaveId: 1,
            count: 1,
            mask: 'BBBBBB',
            pollInterval: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of PropertyConfigModbus', () => {
        const returnedFromService = Object.assign(
          {
            uom: 'BBBBBB',
            controlledTag: true,
            register: 1,
            slaveId: 1,
            count: 1,
            mask: 'BBBBBB',
            pollInterval: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a PropertyConfigModbus', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
