import { BaseEntity } from './../../shared';

export class Wiadomosci implements BaseEntity {
    constructor(
        public id?: number,
        public odkiedy?: string,
        public dokiedy?: string,
        public tresc?: string,
    ) {
    }
}
