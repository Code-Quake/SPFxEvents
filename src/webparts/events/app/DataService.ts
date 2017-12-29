import * as angular from 'angular';

export interface IEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
  }

  export interface IAttendee {
    id: number;
    fullname: string;
    email: string;
    eventid: number;
  }

  export interface IDataService {
    getEvents(): angular.IPromise<IEvent[]>;
    addEvent(title: string, start: Date, end: Date): angular.IPromise<{}>;
    deleteEvent(event: IEvent): angular.IPromise<{}>;
    getAttendeeEvents(): angular.IPromise<IAttendee[]>;
    addAttendeeEvent(fullName: string, email: string, eventId: number): angular.IPromise<{}>;
    deleteAttendeeEvent(attendeeEvent: IAttendee): angular.IPromise<{}>;
  }
  
  export default class DataService implements IDataService {
    public static $inject: string[] = ['$q'];
  
    private eventItems: IEvent[] = [
      {
        id: 1,
        title: 'Prepare demo Web Part',
        start: new Date(2018, 1, 1),
        end: new Date(2018, 1, 1),
      },
      {
        id: 2,
        title: 'Company Meeting 1',
        start: new Date(2018, 1, 2),
        end: new Date(2018, 1, 2),
      },
      {
        id: 1,
        title: 'Company Meeting 2',
        start: new Date(2018, 1, 3),
        end: new Date(2018, 1, 3),
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
    ];

    private nextId: number = 4;
  
    constructor(private $q: angular.IQService) {
    }
  
    public getAttendeeEvents(): angular.IPromise<IAttendee[]> {
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
  
    public addAttendeeEvent(fullName: string, email: string, eventId: number): angular.IPromise<{}> {
      const deferred: angular.IDeferred<{}> = this.$q.defer();
  
      this.attendeeItems.push({
        id: this.nextId++,
        fullname: fullName,
        email: email,
        eventid: eventId
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

    public getEvents(): angular.IPromise<IEvent[]> {
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
  
    public addEvent(title: string, start: Date, end: Date): angular.IPromise<{}> {
      const deferred: angular.IDeferred<{}> = this.$q.defer();
  
      this.eventItems.push({
        id: this.nextId++,
        title: title,
        start: start,
        end: end
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