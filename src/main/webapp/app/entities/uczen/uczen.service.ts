import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Uczen } from './uczen.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UczenService {

    private resourceUrl =  SERVER_API_URL + 'api/uczens';

    constructor(private http: Http) { }

    create(uczen: Uczen): Observable<Uczen> {
        const copy = this.convert(uczen);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(uczen: Uczen): Observable<Uczen> {
        const copy = this.convert(uczen);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Uczen> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Uczen.
     */
    private convertItemFromServer(json: any): Uczen {
        const entity: Uczen = Object.assign(new Uczen(), json);
        return entity;
    }

    /**
     * Convert a Uczen to a JSON which can be sent to the server.
     */
    private convert(uczen: Uczen): Uczen {
        const copy: Uczen = Object.assign({}, uczen);
        return copy;
    }
}
