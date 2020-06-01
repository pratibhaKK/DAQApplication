import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPropertyConfigModbus } from 'app/shared/model/property-config-modbus.model';

type EntityResponseType = HttpResponse<IPropertyConfigModbus>;
type EntityArrayResponseType = HttpResponse<IPropertyConfigModbus[]>;

@Injectable({ providedIn: 'root' })
export class PropertyConfigModbusService {
  public resourceUrl = SERVER_API_URL + 'api/property-config-modbuses';

  constructor(protected http: HttpClient) {}

  create(propertyConfigModbus: IPropertyConfigModbus): Observable<EntityResponseType> {
    return this.http.post<IPropertyConfigModbus>(this.resourceUrl, propertyConfigModbus, { observe: 'response' });
  }

  update(propertyConfigModbus: IPropertyConfigModbus): Observable<EntityResponseType> {
    return this.http.put<IPropertyConfigModbus>(this.resourceUrl, propertyConfigModbus, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPropertyConfigModbus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPropertyConfigModbus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
