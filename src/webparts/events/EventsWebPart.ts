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
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                <tr data-ng-repeat="attendee in vm.attendeeCollection track by $index">
                    <td><input type="text" id="txtFullName" data-ng-model="attendee.FullName1" /></td>
                    <td><input type="text" id="txtEmail" data-ng-model="attendee.Email" /></td>
                    <td><input type="text" id="txtEventID" data-ng-model="attendee.EventID" /></td>
                    <td>
                        <input type="button" id="btnUpdateAttendee" value="Update" data-ng-click="vm.UpdateAttendee(attendee)">
                    </td>
                    <td>
                        <input type="button" id="btnDeleteAttendee" value="Delete" data-ng-click="vm.DeleteAttendee(attendee)">
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td>
                        <select name="" id="" data-ng-model="vm.newAttendeeEventID">
                            <option data-ng-repeat="event in vm.eventCollection track by $index" ng-value="event.ID">{{event.Title}}</option>
                        </select>
                    </td>
                    <td>Full Name:</td>
                    <td>
                        <input type="text" id="txtFullName" data-ng-model="vm.newAttendeeFullName">
                    </td>
                    <td>Email:</td>
                    <td>
                        <input type="text" id="txtEmail" data-ng-model="vm.newAttendeeEmail">
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="button" id="btnRegister" value="Register" data-ng-click="vm.RegisterAttendee()">
                    </td>
                </tr>
            </table>
            <div>
                <table class="${styles.table}">
                    <tr>
                        <th>Event Title</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Campus</th>
                        <th>Total Attendees</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    <tr data-ng-repeat="event in vm.eventCollection track by $index">
                        <td><input type="text" id="txtEventTitle" data-ng-model="event.Title" /></td>
                        <td>{{event.StartDate | date: "MM/dd/yyyy hh:mm"}}</td>
                        <td>{{event.EndDate | date: "MM/dd/yyyy hh:mm"}}</td>
                        <td><input style="width:80px;" type="text" id="txtCampus" data-ng-model="event.Campus" /></td>
                        <td><input style="width:80px;" type="text" id="txtTotal" data-ng-model="event.TotalAttendees" /></td>
                        <td>
                        <input type="button" id="btnUpdateEvent" value="Update" data-ng-click="vm.UpdateEvent(event.ID)">
                    </td>
                        <td>
                            <input type="button" id="btnDeleteEvent" value="Delete" data-ng-click="vm.DeleteEvent(event.ID)">
                        </td>
                    </tr>
                </table>
                <table>
                    <tr>
                        <td>Name:</td>
                        <td colspan="3">
                            <input type="text" id="txtName">
                        </td>
                    </tr>
                    <tr>
                        <td>Start Date:</td>
                        <td>
                            <input type="text" id="txtStartDate">
                        </td>
                        <td>Start Time:</td>
                        <td>
                            <input type="text" id="txtStartTime">
                        </td>
                    </tr>
                    <tr>
                        <td>End Date:</td>
                        <td>
                            <input type="text" id="txtEndDate">
                        </td>
                        <td>End Time:</td>
                        <td>
                            <input type="text" id="txtEndTime">
                        </td>
                    </tr>
                    <tr>
                        <td>Campus:</td>
                        <td colspan="3">
                            <select name="" id="selCampus">
                                <option value="North">North</option>
                                <option value="South">South</option>
                                <option value="East">East</option>
                                <option value="West">West</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <input type="button" id="btnNewEvent" value="Add Event" data-ng-click="vm.AddEvent()">
                        </td>
                    </tr>
                </table>
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
