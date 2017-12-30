import * as angular from 'angular';
import { IDataService, IEvent, IAttendee } from './DataService';

export default class HomeController {
  public isLoading: boolean = false;
  public newEvent: IEvent = null;
  public newToDoActive: boolean = false;
  public eventCollection: any[] = [];
  private showpastevents: boolean = false;

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
  }

  private loadEvents(showpastevents?: boolean): void {
    const vm: HomeController = this;
    this.isLoading = true;
    this.dataService.getEvents(showpastevents)
      .then((todos: IEvent[]): void => {
        vm.eventCollection = todos;
      })
      .finally((): void => {
        vm.isLoading = false;
      });
  }

  public eventKeyDown($event: any): void {
    if ($event.keyCode === 13 && this.newEvent) {
      $event.preventDefault();

      this.eventCollection.unshift({ id: -1, title: this.newEvent, done: false });
      const vm: HomeController = this;

      this.dataService.addEvent(this.newEvent)
        .then((): void => {
          this.newEvent = null;
          this.dataService.getEvents()
            .then((todos: any[]): void => {
              this.eventCollection = todos;
            });
        });
    }
  }

  public deleteEvent(event: IEvent): void {
    if (this.$window.confirm('Are you sure you want to delete this todo item?')) {
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
}