import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Nauczyciele } from './nauczyciele.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class NauczycieleService {

    private resourceUrl =  SERVER_API_URL + 'api/nauczycieles';

    constructor(private http: Http) { }

    create(nauczyciele: Nauczyciele): Observable<Nauczyciele> {
        const copy = this.convert(nauczyciele);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(nauczyciele: Nauczyciele): Observable<Nauczyciele> {
        const copy = this.convert(nauczyciele);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Nauczyciele> {
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
     * Convert a returned JSON object to Nauczyciele.
     */
    private convertItemFromServer(json: any): Nauczyciele {
        const entity: Nauczyciele = Object.assign(new Nauczyciele(), json);
        return entity;
    }

    /**
     * Convert a Nauczyciele to a JSON which can be sent to the server.
     */
    private convert(nauczyciele: Nauczyciele): Nauczyciele {
        const copy: Nauczyciele = Object.assign({}, nauczyciele);
        return copy;
    }
}
