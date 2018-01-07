import * as angular from 'angular';
import { IEvent, IAttendee, IDataService } from './interfaces-module';
import pnp, { List, ListEnsureResult, ItemUpdateResult, ItemAddResult, FieldAddResult } from "sp-pnp-js";

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

  public addEvent(event: IEvent): angular.IPromise<ItemAddResult> {
    const deferred: angular.IDeferred<ItemAddResult> = this.$q.defer();

    pnp.sp.web.lists.getByTitle("Events").items.add(event).then((e: ItemAddResult) => {
      this.eventItems.push({
        ID: e.data.ID,
        Title: event.Title,
        StartDate: event.StartDate,
        EndDate: event.EndDate,
        Campus: event.Campus,
        TotalAttendees: 0
      });

      deferred.resolve(e);
    });

    return deferred.promise;
  }

  public updateEvent(event: IEvent): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    pnp.sp.web.lists.getByTitle("Events").items.getById(event.ID).update({
      Title: event.Title,
      StartDate: event.StartDate,
      EndDate: event.EndDate,
      Campus: event.Campus,
      TotalAttendees: event.TotalAttendees
    }).then(u =>
      deferred.resolve(u)
      );

    return deferred.promise;
  }

  public deleteEvent(event: IEvent): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();
    let pos: number = -1;

    pnp.sp.web.lists.getByTitle("Events").items.getById(event.ID).delete().then(_ => {
      deferred.resolve();
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

  public addAttendee(attendee: IAttendee): angular.IPromise<ItemAddResult> {
    const deferred: angular.IDeferred<ItemAddResult> = this.$q.defer();

    // add an item to the list
    pnp.sp.web.lists.getByTitle("Attendees").items.add({
      Title: attendee.FullName1,
      FullName1: attendee.FullName1,
      Email: attendee.Email,
      EventID: attendee.EventID
    }).then((iar: ItemAddResult) => {
      deferred.resolve(iar);
    });

    return deferred.promise;
  }

  public updateAttendee(attendee: IAttendee): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    pnp.sp.web.lists.getByTitle("Attendees").items.getById(attendee.ID).update({
      FullName1: attendee.FullName1,
      Email: attendee.Email,
      EventID: attendee.EventID
    }).then((iar: ItemUpdateResult) =>
      deferred.resolve(iar)
      );

    return deferred.promise;
  }

  public deleteAttendee(attendee: IAttendee): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();
    let pos: number = -1;

    pnp.sp.web.lists.getByTitle("Attendees").items.getById(attendee.ID).delete().then(_ => {
      deferred.resolve();
    });

    return deferred.promise;
  }
}