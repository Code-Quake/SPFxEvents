import * as angular from 'angular';
import { IEvent, IAttendee, IDataService } from './interfaces-module';

export default class TestDataService implements IDataService {
  public static $inject: string[] = ['$q'];

  private events: IEvent[] = [
    {
      id: 1,
      title: 'Prepare demo Web Part',
      start: new Date(2018, 1, 1),
      end: new Date(2018, 1, 1),
      campus: 'North',
      totalcount: 0
    },
    {
      id: 2,
      title: 'Company Meeting 1',
      start: new Date(2018, 1, 2),
      end: new Date(2018, 1, 2),
      campus: 'South',
      totalcount: 0
    },
    {
      id: 3,
      title: 'Company Meeting 2',
      start: new Date(2018, 1, 3),
      end: new Date(2018, 1, 3),
      campus: 'East',
      totalcount: 0
    },
    {
      id: 4,
      title: 'Past Event 1',
      start: new Date(2017, 12, 1),
      end: new Date(2017, 12, 1),
      campus: 'West',
      totalcount: 0
    }
  ];

  private attendees: IAttendee[] = [
    {
      id: 1,
      fullname: 'Clark Kent',
      email: 'ckent@dailyplanet.com',
      eventid: 1,
    },
    {
      id: 2,
      fullname: 'Bruce Wayne',
      email: 'bwayne@wayne.com',
      eventid: 2,
    },
    {
      id: 3,
      fullname: 'Diana Prince',
      email: 'dprince@themyscira.com',
      eventid: 3,
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
      id: this.nextAttendeeId++,
      fullname: attendeeEvent.fullname,
      email: attendeeEvent.email,
      eventid: attendeeEvent.eventid
    });

    deferred.resolve();

    return deferred.promise;
  }

  public deleteAttendee(attendeeEvent: IAttendee): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    let pos: number = -1;
    for (let i: number = 0; i < this.attendees.length; i++) {
      if (this.attendees[i].id === attendeeEvent.id) {
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
      id: this.nextEventId++,
      title: event.title,
      start: event.start,
      end: event.end,
      campus: event.campus,
      totalcount: 0
    });

    deferred.resolve();

    return deferred.promise;
  }

  public deleteEvent(event: IEvent): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    let pos: number = -1;
    for (let i: number = 0; i < this.events.length; i++) {
      if (this.events[i].id === event.id) {
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