import * as angular from 'angular';
import { IEvent, IAttendee, IDataService } from './interfaces-module';

export default class TestDataService implements IDataService {
  public static $inject: string[] = ['$q'];

  private events: IEvent[] = [
    {
      ID: 1,
      Title: 'Prepare demo Web Part',
      StartDate: new Date(2018, 1, 1).toDateString(),
      EndDate: new Date(2018, 1, 1).toDateString(),
      Campus: 'North',
      TotalCount: 10
    },
    {
      ID: 2,
      Title: 'Company Meeting 1',
      StartDate: new Date(2018, 1, 2).toDateString(),
      EndDate: new Date(2018, 1, 2).toDateString(),
      Campus: 'South',
      TotalCount: 20
    },
    {
      ID: 3,
      Title: 'Company Meeting 2',
      StartDate: new Date(2018, 1, 3).toDateString(),
      EndDate: new Date(2018, 1, 3).toDateString(),
      Campus: 'East',
      TotalCount: 30
    },
    {
      ID: 4,
      Title: 'Past Event 1',
      StartDate: new Date(2018, 12, 2).toDateString(),
      EndDate: new Date(2018, 12, 2).toDateString(),
      Campus: 'West',
      TotalCount: 120
    }
  ];

  private attendees: IAttendee[] = [
    {
      ID: 1,
      FullName: 'Clark Kent',
      Email: 'ckent@dailyplanet.com',
      EventID: 1,
    },
    {
      ID: 2,
      FullName: 'Bruce Wayne',
      Email: 'bwayne@wayne.com',
      EventID: 2,
    },
    {
      ID: 3,
      FullName: 'Diana Prince',
      Email: 'dprince@themyscira.com',
      EventID: 3,
    },
  ];

  private nextEventId: number = 5;
  private nextAttendeeId: number = 4;

  constructor(private $q: angular.IQService) {
  }

  public getCurrentEmail(): angular.IPromise<string> {
    const deferred: angular.IDeferred<string> = this.$q.defer();
    const email: string = 'joe.jorden@jljorden2.onmicrosoft.com';

    deferred.resolve(email);

    return deferred.promise;
  }

  public getAttendees(showpastevents?: boolean): angular.IPromise<IAttendee[]> {
    const deferred: angular.IDeferred<IAttendee[]> = this.$q.defer();
    const attendees: IAttendee[] = [];

    for (let i: number = 0; i < this.attendees.length; i++) {
      // if (startdate <= Date.now && !showpastevents) {
      //   continue;
      // }

      attendees.push(this.attendees[i]);
    }

    deferred.resolve(attendees);

    return deferred.promise;
  }

  public addAttendee(attendeeEvent: IAttendee): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    this.attendees.push({
      ID: this.nextAttendeeId++,
      FullName: attendeeEvent.FullName,
      Email: attendeeEvent.Email,
      EventID: attendeeEvent.EventID
    });

    deferred.resolve();

    return deferred.promise;
  }

  public deleteAttendee(attendeeEvent: IAttendee): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    let pos: number = -1;
    for (let i: number = 0; i < this.attendees.length; i++) {
      if (this.attendees[i].ID === attendeeEvent.ID) {
        pos = i;
        break;
      }
    }

    if (pos > -1) {
      this.attendees.splice(pos, 1);
      deferred.resolve();
    }
    else {
      deferred.reject();
    }

    return deferred.promise;
  }

  public getEvents(showpastevents?: boolean): angular.IPromise<IEvent[]> {
    const deferred: angular.IDeferred<IEvent[]> = this.$q.defer();

    const events: IEvent[] = [];
    for (let i: number = 0; i < this.events.length; i++) {
      // if (startdate <= Date.now && !showpastevents) {
      //   continue;
      // }

      events.push(this.events[i]);
    }

    deferred.resolve(events);

    return deferred.promise;
  }

  public addEvent(event: IEvent): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    this.events.push({
      ID: 0,
      Title: event.Title,
      StartDate: event.StartDate,
      EndDate: event.EndDate,
      Campus: event.Campus,
      TotalCount: 0
    });

    deferred.resolve();

    return deferred.promise;
  }

  public deleteEvent(event: IEvent): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    let pos: number = -1;
    for (let i: number = 0; i < this.events.length; i++) {
      if (this.events[i].ID === event.ID) {
        pos = i;
        break;
      }
    }

    if (pos > -1) {
      this.events.splice(pos, 1);
      deferred.resolve();
    }
    else {
      deferred.reject();
    }

    return deferred.promise;
  }
}