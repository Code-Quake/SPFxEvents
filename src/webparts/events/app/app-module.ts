import * as angular from 'angular';
import HomeController from './HomeController';
import DataService from './DataService';

const eventsapp: angular.IModule = angular.module('eventsapp', []);

eventsapp
  .controller('HomeController', HomeController)
  .service('DataService', DataService);