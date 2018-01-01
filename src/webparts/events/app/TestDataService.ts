import * as angular from 'angular';
import { IEvent, IAttendee, IDataService } from './interfaces-module';

export default class TestDataService implements IDataService {
  public static $inject: string[] = ['$q'];

  private eventItems: IEvent[] = [
    {
      id: 1,
      title: 'Prepare demo Web Part',
      start: new Date(2018, 1, 1),
      end: new Date(2018, 1, 1),
      campus: 'North'
    },
    {
      id: 2,
      title: 'Company Meeting 1',
      start: new Date(2018, 1, 2),
      end: new Date(2018, 1, 2),
      campus: 'South'
    },
    {
      id: 1,
      title: 'Company Meeting 2',
      start: new Date(2018, 1, 3),
      end: new Date(2018, 1, 3),
      campus: 'East'
    },
  ];

  private attendeeItems: IAttendee[] = [
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
    {
      id: 3,
      fullname: 'Joe Jorden',
      email: 'joe.jorden@jljorden.onmicrosoft.com',
      eventid: 3,
    }
  ];

  private nextId: number = 4;

  constructor(private $q: angular.IQService) {
  }

  protected getCurrentEmail(): Promise<string> {
    const deferred: angular.IDeferred<string> = this.$q.defer();
    const email: string = 'joe.jorden@jljorden.onmicrosoft.com';

    deferred.resolve(email);

    return deferred.promise;
  }

  public getAttendeeEvents(showpastevents?: boolean): angular.IPromise<IAttendee[]> {
    const deferred: angular.IDeferred<IAttendee[]> = this.$q.defer();

    const attendeeEvents: IAttendee[] = [];
    for (let i: number = 0; i < this.attendeeItems.length; i++) {
      // if (hideFinishedTasks && this.items[i].done) {
      //   continue;
      // }

      attendeeEvents.push(this.attendeeItems[i]);
    }

    deferred.resolve(attendeeEvents);

    return deferred.promise;
  }

  public addAttendeeEvent(attendeeEvent: IAttendee): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    this.attendeeItems.push({
      id: this.nextId++,
      fullname: attendeeEvent.fullname,
      email: attendeeEvent.email,
      eventid: attendeeEvent.eventid
    });

    deferred.resolve();

    return deferred.promise;
  }

  public deleteAttendeeEvent(attendeeEvent: IAttendee): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    let pos: number = -1;
    for (let i: number = 0; i < this.attendeeItems.length; i++) {
      if (this.attendeeItems[i].id === attendeeEvent.id) {
        pos = i;
        break;
      }
    }

    if (pos > -1) {
      this.attendeeItems.splice(pos, 1);
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
    for (let i: number = 0; i < this.eventItems.length; i++) {
      // if (hideFinishedTasks && this.items[i].done) {
      //   continue;
      // }

      events.push(this.eventItems[i]);
    }

    deferred.resolve(events);

    return deferred.promise;
  }

  public addEvent(event: IEvent): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    this.eventItems.push({
      id: this.nextId++,
      title: event.title,
      start: event.start,
      end: event.end,
      campus: event.campus
    });

    deferred.resolve();

    return deferred.promise;
  }

  public deleteEvent(event: IEvent): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    let pos: number = -1;
    for (let i: number = 0; i < this.eventItems.length; i++) {
      if (this.eventItems[i].id === event.id) {
        pos = i;
        break;
      }
    }

    if (pos > -1) {
      this.eventItems.splice(pos, 1);
      deferred.resolve();
    }
    else {
      deferred.reject();
    }

    return deferred.promise;
  }
}