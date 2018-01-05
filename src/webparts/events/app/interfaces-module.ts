export interface IEvent {
    ID: number;
    Title: string;
    StartDate: string;
    EndDate: string;
    Campus: string;
    TotalAttendees: number;
}

export interface IAttendee {
    ID: number;
    FullName1: string;
    Email: string;
    EventID: number;
}

export interface IDataService {
    getEvents(showpastevents?: boolean): angular.IPromise<IEvent[]>;
    addEvent(event: IEvent): angular.IPromise<{}>;
    updateEvent(event: IEvent): angular.IPromise<{}>;
    deleteEvent(event: IEvent): angular.IPromise<{}>;
    getAttendees(showpastevents?: boolean): angular.IPromise<IAttendee[]>;
    addAttendee(attendee: IAttendee): angular.IPromise<{}>;
    updateAttendee(attendee: IAttendee): angular.IPromise<{}>;
    deleteAttendee(attendee: IAttendee): angular.IPromise<{}>;
    getCurrentEmail(): angular.IPromise<string>;
}
