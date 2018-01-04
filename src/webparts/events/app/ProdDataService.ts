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
        let datetest = new Date(e[i].StartDate);
        if (datetest < new Date() && !showpastevents) {
          continue;
        }
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

  public addAttendee(attendee: IAttendee): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    // add an item to the list
    pnp.sp.web.lists.getByTitle("Attendees").items.add({
      Title: attendee.FullName,
      FullName1: attendee.FullName,
      Email: attendee.Email,
      EventID: attendee.EventID
    }).then((iar: ItemAddResult) => {
      this.attendeeItems.push({
        ID: iar.data.ID,
        FullName: attendee.FullName,
        Email: attendee.Email,
        EventID: attendee.EventID
      });
      deferred.resolve(iar);
    });

    return deferred.promise;
  }

  public updateAttendee(attendeeEvent: IAttendee): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    pnp.sp.web.lists.getByTitle("Attendees").items.getById(attendeeEvent.ID).update({
      FullName: attendeeEvent.FullName,
      Email: attendeeEvent.Email,
      EventID: attendeeEvent.EventID
    }).then(u =>
      deferred.resolve(u)
      );

    return deferred.promise;
  }

  public deleteAttendee(attendeeEvent: IAttendee): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();
    let pos: number = -1;

    pnp.sp.web.lists.getByTitle("Attendees").items.getById(attendeeEvent.ID).delete().then(_ => {
      for (let i: number = 0; i < this.attendeeItems.length; i++) {
        if (this.attendeeItems[i].ID === attendeeEvent.ID) {
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
    });

    return deferred.promise;
  }

  public addEvent(event: IEvent): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    pnp.sp.web.lists.getByTitle("Events").items.add(event).then(a => {
      this.eventItems.push({
        ID: a["ID"],
        Title: event.Title,
        StartDate: event.StartDate,
        EndDate: event.EndDate,
        Campus: event.Campus,
        TotalCount: 0
      });

      deferred.resolve(a);
    });

    return deferred.promise;
  }

  public updateEvent(event: IEvent): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    pnp.sp.web.lists.getByTitle("Events").items.getById(event.ID).update({
      Title: event.Title,
      StartDate: event.StartDate,
      EndDate: event.EndDate,
      Campus: event.Campus
    }).then(u =>
      deferred.resolve(u)
      );

    return deferred.promise;
  }

  public deleteEvent(event: IEvent): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();
    let pos: number = -1;

    pnp.sp.web.lists.getByTitle("Events").items.getById(event.ID).delete().then(_ => {
      for (let i: number = 0; i < this.eventItems.length; i++) {
        if (this.eventItems[i].ID === event.ID) {
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
    });

    return deferred.promise;
  }
}