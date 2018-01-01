import * as angular from 'angular';
import { IDataService, IEvent, IAttendee } from './interfaces-module';

export default class HomeController {
  public isLoading: boolean = false;
  public newEvent: IEvent = null;
  public newToDoActive: boolean = false;
  public eventCollection: IEvent[] = [];
  public attendeeEventCollection: IAttendee[] = [];
  private showpastevents: boolean = false;
  public currentEmail: string = '';

  public static $inject: string[] = ['DataService', '$window', '$rootScope'];

  constructor(private dataService: IDataService, private $window: angular.IWindowService, private $rootScope: angular.IRootScopeService) {
    const vm: HomeController = this;
    this.init();

    $rootScope.$on('configurationChanged', (event: angular.IAngularEvent, args: { showpastevents: boolean }): void => {
      vm.init(args.showpastevents);
    });
  }

  private init(showpastevents?: boolean): void {
    this.showpastevents = showpastevents;
    this.loadEvents(showpastevents);
    this.loadAttendeeEvents(showpastevents);

  }

  private getCurrentEmail(): void {
    const vm: HomeController = this;
    this.isLoading = true;
    this.dataService.getCurrentEmail()
      .then((email: string): void => {
        vm.currentEmail = email;
      });
  }

  private loadEvents(showpastevents?: boolean): void {
    const vm: HomeController = this;
    this.isLoading = true;
    this.dataService.getEvents(showpastevents)
      .then((events: IEvent[]): void => {
        vm.eventCollection = events;
      });
  }

  private loadAttendeeEvents(showpastevents?: boolean): void {
    const vm: HomeController = this;
    this.isLoading = true;
    this.dataService.getAttendeeEvents(showpastevents)
      .then((attendeeEvents: IAttendee[]): void => {
        vm.attendeeEventCollection = attendeeEvents;
      });
  }

  private addEvent(): void {
    const vm: HomeController = this;
    let event: IEvent;
    event.title = 'Test';
    event.start = new Date(2018, 1, 1)
    event.end = new Date(2018, 1, 1)

    this.dataService.addEvent(event)
      .then((events: IEvent[]): void => {
        vm.eventCollection = events;
      });
  }

  private addAttendeeEvent(): void {
    const vm: HomeController = this;
    let attendeeEvent: IAttendee;
    attendeeEvent.fullname = 'Joe Jorden';

    this.dataService.addAttendeeEvent(attendeeEvent)
      .then((attendees: IAttendee[]): void => {
        vm.attendeeEventCollection = attendees;
      });
  }

  public deleteEvent(event: IEvent): void {
    if (this.$window.confirm('Are you sure you want to delete this event?')) {
      let index: number = -1;
      for (let i: number = 0; i < this.eventCollection.length; i++) {
        if (this.eventCollection[i].id === event.id) {
          index = i;
          break;
        }
      }

      if (index > -1) {
        this.eventCollection.splice(index, 1);
      }

      const vm: HomeController = this;

      this.dataService.deleteEvent(event)
        .then((): void => {
          this.dataService.getEvents(vm.showpastevents)
            .then((todos: any[]): void => {
              this.eventCollection = todos;
            });
        });
    }
  }

  public deleteAttendeeEvent(attendeeEvent: IAttendee): void {
    if (this.$window.confirm('Are you sure you want to delete this attendee?')) {
      let index: number = -1;
      for (let i: number = 0; i < this.attendeeEventCollection.length; i++) {
        if (this.attendeeEventCollection[i].id === attendeeEvent.id) {
          index = i;
          break;
        }
      }

      if (index > -1) {
        this.eventCollection.splice(index, 1);
      }

      const vm: HomeController = this;

      this.dataService.deleteAttendeeEvent(attendeeEvent)
        .then((): void => {
          this.dataService.getAttendeeEvents(vm.showpastevents)
            .then((attendeeEvents: IAttendee[]): void => {
              this.attendeeEventCollection = attendeeEvents;
            });
        });
    }
  }
}