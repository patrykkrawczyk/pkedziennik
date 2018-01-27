import { BaseEntity } from './../../shared';

export class Sala implements BaseEntity {
    constructor(
        public id?: number,
        public numer?: string,
        public zasoby?: string,
        public przedmioty?: string,
    ) {
    }
}
