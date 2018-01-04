export interface IEvent {
    ID: number;
    Title: string;
    StartDate: string;
    EndDate: string;
    Campus: string;
    TotalCount: number;
}

export interface IAttendee {
    ID: number;
    FullName: string;
    Email: string;
    EventID: number;
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
