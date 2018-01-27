import { BaseEntity } from './../../shared';

export class Nauczyciele implements BaseEntity {
    constructor(
        public id?: number,
        public imie?: string,
        public nazwisko?: string,
        public pesel?: string,
        public telefon?: string,
    ) {
    }
}
