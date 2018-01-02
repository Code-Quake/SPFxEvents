export interface IEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
    campus: string;
    totalcount: number;
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
    getAttendees(showpastevents?: boolean): angular.IPromise<IAttendee[]>;
    addAttendee(attendeeEvent: IAttendee): angular.IPromise<{}>;
    deleteAttendee(attendeeEvent: IAttendee): angular.IPromise<{}>;
    getCurrentEmail(): angular.IPromise<string>;
}
