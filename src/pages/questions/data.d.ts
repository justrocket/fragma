import moment, { Moment } from "moment";

export interface Question extends Audited {
    _id: string,
    title: number,
    text: number,
    answers: Answer[],
}

export interface Answer extends Audited {
    _id: string,
    text: number,
}

export interface Audited {
    created: Moment,
    lastModified: Moment,
    createdBy: string,
    lastModifiedBy: string,
}