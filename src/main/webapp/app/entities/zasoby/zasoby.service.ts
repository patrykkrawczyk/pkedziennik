import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Zasoby } from './zasoby.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ZasobyService {

    private resourceUrl =  SERVER_API_URL + 'api/zasobies';

    constructor(private http: Http) { }

    create(zasoby: Zasoby): Observable<Zasoby> {
        const copy = this.convert(zasoby);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(zasoby: Zasoby): Observable<Zasoby> {
        const copy = this.convert(zasoby);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Zasoby> {
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
     * Convert a returned JSON object to Zasoby.
     */
    private convertItemFromServer(json: any): Zasoby {
        const entity: Zasoby = Object.assign(new Zasoby(), json);
        return entity;
    }

    /**
     * Convert a Zasoby to a JSON which can be sent to the server.
     */
    private convert(zasoby: Zasoby): Zasoby {
        const copy: Zasoby = Object.assign({}, zasoby);
        return copy;
    }
}
