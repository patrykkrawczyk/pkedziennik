import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Sala } from './sala.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SalaService {

    private resourceUrl =  SERVER_API_URL + 'api/salas';

    constructor(private http: Http) { }

    create(sala: Sala): Observable<Sala> {
        const copy = this.convert(sala);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(sala: Sala): Observable<Sala> {
        const copy = this.convert(sala);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Sala> {
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
     * Convert a returned JSON object to Sala.
     */
    private convertItemFromServer(json: any): Sala {
        const entity: Sala = Object.assign(new Sala(), json);
        return entity;
    }

    /**
     * Convert a Sala to a JSON which can be sent to the server.
     */
    private convert(sala: Sala): Sala {
        const copy: Sala = Object.assign({}, sala);
        return copy;
    }
}
