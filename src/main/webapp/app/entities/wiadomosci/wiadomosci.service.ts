import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Wiadomosci } from './wiadomosci.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class WiadomosciService {

    private resourceUrl =  SERVER_API_URL + 'api/wiadomoscis';

    constructor(private http: Http) { }

    create(wiadomosci: Wiadomosci): Observable<Wiadomosci> {
        const copy = this.convert(wiadomosci);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(wiadomosci: Wiadomosci): Observable<Wiadomosci> {
        const copy = this.convert(wiadomosci);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Wiadomosci> {
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
     * Convert a returned JSON object to Wiadomosci.
     */
    private convertItemFromServer(json: any): Wiadomosci {
        const entity: Wiadomosci = Object.assign(new Wiadomosci(), json);
        return entity;
    }

    /**
     * Convert a Wiadomosci to a JSON which can be sent to the server.
     */
    private convert(wiadomosci: Wiadomosci): Wiadomosci {
        const copy: Wiadomosci = Object.assign({}, wiadomosci);
        return copy;
    }
}
