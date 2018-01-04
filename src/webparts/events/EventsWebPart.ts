import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp from "sp-pnp-js";

import styles from './EventsWebPart.module.scss';
import * as strings from 'EventsWebPartStrings';

import * as angular from 'angular';
import './app/app-module';
import LandingTemplate from './LandingTemplate';

export interface IEventsWebPartProps {
  description: string;
  showpastevents: boolean;
}

export default class EventsWebPart extends BaseClientSideWebPart<IEventsWebPartProps> {

  private $injector: angular.auto.IInjectorService;

  public render(): void {
    if (this.renderedOnce === false) {
      // var ajax = new XMLHttpRequest();
      // ajax.open("GET", "/src/webparts/todo/landingtemplate.html", false);
      // ajax.send();
      // this.domElement.innerHTML = ajax.responseText;

      //this.domElement.innerHTML = LandingTemplate.templateHtml;

      this.domElement.innerHTML = `
      <div class="${styles.events}" data-ng-controller="HomeController as vm">
      <table class="${styles.table}">
          <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Event Title</th>
          </tr>
          <tr data-ng-repeat="attendee in vm.attendeeCollection track by $index">
            <td>{{attendee.FullName1}}</td>
            <td>{{attendee.Email}}</td>
            <td>{{attendee.EventID}}</td>
          </tr>
          </table>
          <select name="" id="">
              <option data-ng-repeat="event in vm.eventCollection track by $index" ng-value="event.ID">{{event.Title}}</option>
          </select>
          <div><input type="text" id="txtFullName"></div>
          <div><input type="text" id="txtEmail"></div>
          <div><input type="button" id="btnRegister" value="Register"></div>
          <div>
              <table class="${styles.table}">
                  <tr>
                      <th>Event Title</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Campus</th>
                      <th>Total Attendees</th>
                  </tr>
                  <tr data-ng-repeat="event in vm.eventCollection track by $index">
                      <td>{{event.Title}}</td>
                      <td>{{event.StartDate}}</td>
                      <td>{{event.EndDate}}</td>
                      <td>{{event.Campus}}</td>
                      <td>{{event.TotalAttendees}}</td>
                  </tr>
              </table>
              <div><input type="text" id="txtName"></div>
              <div><input type="text" id="txtDate"></div>
              <div><input type="text" id="txtTime"></div>
              <div>
                  <select name="" id="selCampus">
                      <option value="North">North</option>
                      <option value="South">South</option>
                      <option value="East">East</option>
                      <option value="West">West</option>
                  </select>
                  <div><input type="button" id="btnNewEvent" value="Add Event"></div>
              </div>
          </div>
      </div>`;

      this.$injector = angular.bootstrap(this.domElement, ['eventsapp']);
    }
    this.$injector.get('$rootScope').$broadcast('configurationChanged', {
      showpastevents: this.properties.showpastevents
    });
  }

  protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
      pnp.setup({
        spfxContext: this.context
      });
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneToggle('showpastevents', {
                  label: strings.ShowPastEventsFieldLabel
                })

              ]
            }
          ]
        }
      ]
    };
  }
}
