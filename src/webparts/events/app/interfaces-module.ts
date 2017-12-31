export interface IEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
}

export interface IAttendee {
    id: number;
    fullname: string;
    email: string;
    eventid: number;
}

export interface IDataService {
    getEvents(showpastevents?: boolean): angular.IPromise<IEvent[]>;
    addEvent(event: IEvent): angular.IPromise<{}>;
    deleteEvent(event: IEvent): angular.IPromise<{}>;
    getAttendeeEvents(showpastevents?: boolean): angular.IPromise<IAttendee[]>;
    addAttendeeEvent(attendeeEvent: IAttendee): angular.IPromise<{}>;
    deleteAttendeeEvent(attendeeEvent: IAttendee): angular.IPromise<{}>;
}
