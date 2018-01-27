import { BaseEntity } from './../../shared';

export class Zasoby implements BaseEntity {
    constructor(
        public id?: number,
        public nazwa?: string,
        public sala?: string,
        public ilosc?: string,
    ) {
    }
}
