import { BaseEntity } from './../../shared';

export class Klasa implements BaseEntity {
    constructor(
        public id?: number,
        public nazwa?: string,
        public srednia?: string,
    ) {
    }
}
