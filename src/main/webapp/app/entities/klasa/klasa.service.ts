import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Klasa } from './klasa.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class KlasaService {

    private resourceUrl =  SERVER_API_URL + 'api/klasas';

    constructor(private http: Http) { }

    create(klasa: Klasa): Observable<Klasa> {
        const copy = this.convert(klasa);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(klasa: Klasa): Observable<Klasa> {
        const copy = this.convert(klasa);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Klasa> {
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
     * Convert a returned JSON object to Klasa.
     */
    private convertItemFromServer(json: any): Klasa {
        const entity: Klasa = Object.assign(new Klasa(), json);
        return entity;
    }

    /**
     * Convert a Klasa to a JSON which can be sent to the server.
     */
    private convert(klasa: Klasa): Klasa {
        const copy: Klasa = Object.assign({}, klasa);
        return copy;
    }
}
