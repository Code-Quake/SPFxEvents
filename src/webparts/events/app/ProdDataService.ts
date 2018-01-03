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

    pnp.sp.web.lists.getByTitle("Events").items.select("Id", "Title", "StartDate", "EndDate", "Campus", "TotalAttendees").getAs<IEvent[]>().then(e => {
      for (let i: number = 0; i < e.length; i++) {
        // if (startdate <= Date.now && !showpastevents) {
        //   continue;
        // }
        events.push(e[i]);
      }

      deferred.resolve(events);
    });

    return deferred.promise;
  }

  public getAttendees(showpastevents?: boolean): angular.IPromise<IAttendee[]> {
    const attendees: IAttendee[] = [];
    const deferred: angular.IDeferred<IAttendee[]> = this.$q.defer();

    pnp.sp.web.lists.getByTitle("Attendees").items.select("Id", "FullName1", "Email", "EventID").getAs<IAttendee[]>().then(e => {
      for (let i: number = 0; i < e.length; i++) {
        // if (startdate <= Date.now && !showpastevents) {
        //   continue;
        // }
        attendees.push(e[i]);
      }

      deferred.resolve(attendees);
    });

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