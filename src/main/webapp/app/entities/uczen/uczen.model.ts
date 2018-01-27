import { BaseEntity } from './../../shared';

export class Uczen implements BaseEntity {
    constructor(
        public id?: number,
        public imie?: string,
        public nazwisko?: string,
        public klasa?: string,
    ) {
    }
}
