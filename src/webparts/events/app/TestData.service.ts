import * as angular from 'angular';
import { IEvent, IAttendee, IDataService } from './interfaces.module';
import pnp, { List, ListEnsureResult, ItemUpdateResult, ItemAddResult, FieldAddResult } from "sp-pnp-js";

export default class TestDataService implements IDataService {
  public static $inject: string[] = ['$q'];

  private eventItems: IEvent[] = [
    {
      ID: 1,
      Title: 'Prepare demo Web Part',
      StartDate: new Date(2018, 1, 1).toDateString(),
      EndDate: new Date(2018, 1, 1).toDateString(),
      Campus: 'North',
      TotalAttendees: 10
    },
    {
      ID: 2,
      Title: 'Company Meeting 1',
      StartDate: new Date(2018, 1, 2).toDateString(),
      EndDate: new Date(2018, 1, 2).toDateString(),
      Campus: 'South',
      TotalAttendees: 20
    },
    {
      ID: 3,
      Title: 'Company Meeting 2',
      StartDate: new Date(2018, 1, 3).toDateString(),
      EndDate: new Date(2018, 1, 3).toDateString(),
      Campus: 'East',
      TotalAttendees: 30
    },
    {
      ID: 4,
      Title: 'Past Event 1',
      StartDate: new Date("12/2/2017 13:00").toDateString(),
      EndDate: new Date("12/2/2017 14:00").toDateString(),
      Campus: 'West',
      TotalAttendees: 120
    }
  ];

  private attendeeItems: IAttendee[] = [
    {
      ID: 1,
      FullName1: 'Clark Kent',
      Email: 'ckent@dailyplanet.com',
      EventID: 1,
    },
    {
      ID: 2,
      FullName1: 'Bruce Wayne',
      Email: 'bwayne@wayne.com',
      EventID: 2,
    },
    {
      ID: 3,
      FullName1: 'Diana Prince',
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

  public getEvents(showpastevents?: boolean): angular.IPromise<IEvent[]> {
    const deferred: angular.IDeferred<IEvent[]> = this.$q.defer();
    let eventItems: IEvent[] = [];

    for (let i: number = 0; i < this.eventItems.length; i++) {
      let datetest = new Date(this.eventItems[i].StartDate);
      if (datetest < new Date() && !showpastevents) {
        continue;
      }
      else{
        eventItems.push(this.eventItems[i]);
      }
    }

    deferred.resolve(eventItems);

    return deferred.promise;
  }

  public addEvent(event: IEvent): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    this.nextEventId = this.nextEventId++;

    let iar: ItemAddResult = {
      data: [{
        ID: this.nextEventId
      }],
      item: null
    }

    deferred.resolve(iar);

    return deferred.promise;
  }

  public updateEvent(event: IEvent): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    for (let i: number = 0; i < this.eventItems.length; i++) {
      if (this.eventItems[i].ID === event.ID) {
        this.eventItems[i].Campus = event.Campus;
        this.eventItems[i].EndDate = event.EndDate;
        this.eventItems[i].StartDate = event.StartDate;
        this.eventItems[i].Title = event.Title;
        this.eventItems[i].TotalAttendees = event.TotalAttendees;
      }
    }      

    deferred.resolve(event);

    return deferred.promise;
  }

  public deleteEvent(event: IEvent): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    deferred.resolve();

    return deferred.promise;
  }

  public getAttendees(showpastevents?: boolean): angular.IPromise<IAttendee[]> {
    const deferred: angular.IDeferred<IAttendee[]> = this.$q.defer();
    let attendeeItems: IAttendee[] = [];

    for (let i: number = 0; i < this.eventItems.length; i++) {
      attendeeItems.push(this.attendeeItems[i]);
      // let datetest = new Date(this.attendees[i].StartDate);
      // if (datetest < new Date() && !showpastevents) {
      //   continue;
      // }
      // else{
      //   eventItems.push(this.events[i]);
      // }
    }

    deferred.resolve(this.attendeeItems);

    return deferred.promise;
  }

  public addAttendee(attendee: IAttendee): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    this.nextAttendeeId = this.nextAttendeeId++;
   
    let iar: ItemAddResult = {
      data: [{
        ID: this.nextAttendeeId
      }],
      item: null
    }

    for (let i: number = 0; i < this.eventItems.length; i++) {
      if (this.eventItems[i].ID === attendee.EventID) {
        let total: number = ++this.eventItems[i].TotalAttendees;
        let eventItem: IEvent = this.eventItems[i];
        eventItem.TotalAttendees = total;

        this.updateEvent(eventItem).then((iar2: ItemAddResult) => {
          iar2.data = iar;
          deferred.resolve(iar2);
        });
      }
    }      

    return deferred.promise;
  }

  public updateAttendee(attendee: IAttendee): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    deferred.resolve(attendee)
    
    return deferred.promise;
  }

  public deleteAttendee(attendee: IAttendee): angular.IPromise<{}> {
    const deferred: angular.IDeferred<{}> = this.$q.defer();

    deferred.resolve();

    return deferred.promise;
  }
}