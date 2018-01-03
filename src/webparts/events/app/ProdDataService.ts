import * as angular from 'angular';
import { IEvent, IAttendee, IDataService } from './interfaces-module';
import pnp, { List, ListEnsureResult, ItemAddResult, FieldAddResult } from "sp-pnp-js";

export default class ProdDataService implements IDataService {
  public static $inject: string[] = ['$q'];

  private eventItems: IEvent[] = [];

  private attendeeItems: IAttendee[] = [];

  constructor(private $q: angular.IQService) {
  }

  public getCurrentEmail(): angular.IPromise<string> {
    const deferred: angular.IDeferred<string> = this.$q.defer();

    pnp.sp.profiles.myProperties.get()
      .then(userprops => {
        deferred.resolve(userprops.Email);
      });

    return deferred.promise;
  }

  public getEvents(showpastevents?: boolean): angular.IPromise<IEvent[]> {
    const events: IEvent[] = [];
    const deferred: angular.IDeferred<IEvent[]> = this.$q.defer();

    let attendees = pnp.sp.web.lists.getByTitle('Events').select("Id", "Title", "StartDate", "EndDate", "Campus", "TotalAttendees").getAs<IEvent[]>();

    for (let i: number = 0; i < this.eventItems.length; i++) {
      // if (startdate <= Date.now && !showpastevents) {
      //   continue;
      // }

      events.push(this.eventItems[i]);
    }

    deferred.resolve(events);

    return deferred.promise;
  }

  public getAttendees(showpastevents?: boolean): angular.IPromise<IAttendee[]> {
    const deferred: angular.IDeferred<IAttendee[]> = this.$q.defer();
    const attendeeEvents: IAttendee[] = [];

    let attendees = pnp.sp.web.lists.getByTitle('Attendees').select("Id", "Title", "FullName", "Email", "EventID").getAs<IAttendee[]>();

    for (let i: number = 0; i < this.attendeeItems.length; i++) {
      // if (startdate <= Date.now && !showpastevents) {
      //   continue;
      // }

      attendeeEvents.push(this.attendeeItems[i]);
    }

    deferred.resolve(attendeeEvents);

    return deferred.promise;
  }

  public addAttendee(attendeeEvent: IAttendee): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    this.attendeeItems.push({
      id: 0,
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

  public addEvent(event: IEvent): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    this.eventItems.push({
      id: 0,
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