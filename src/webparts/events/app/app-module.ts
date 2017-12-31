import * as angular from 'angular';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import HomeController from './HomeController';
import TestDataService from './TestDataService';
import ProdDataService from './ProdDataService';

const eventsapp: angular.IModule = angular.module('eventsapp', []);

if (Environment.type === EnvironmentType.Local) {
  eventsapp
    .controller('HomeController', HomeController)
    .service('DataService', TestDataService);
}
else {
  eventsapp
    .controller('HomeController', HomeController)
    .service('DataService', ProdDataService);
}