import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITagMaster } from 'app/shared/model/tag-master.model';

type EntityResponseType = HttpResponse<ITagMaster>;
type EntityArrayResponseType = HttpResponse<ITagMaster[]>;

@Injectable({ providedIn: 'root' })
export class TagMasterService {
  public resourceUrl = SERVER_API_URL + 'api/tag-masters';

  constructor(protected http: HttpClient) {}

  create(tagMaster: ITagMaster): Observable<EntityResponseType> {
    return this.http.post<ITagMaster>(this.resourceUrl, tagMaster, { observe: 'response' });
  }

  update(tagMaster: ITagMaster): Observable<EntityResponseType> {
    return this.http.put<ITagMaster>(this.resourceUrl, tagMaster, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITagMaster>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITagMaster[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
