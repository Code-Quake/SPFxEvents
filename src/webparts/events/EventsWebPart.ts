import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox
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
}

export default class EventsWebPart extends BaseClientSideWebPart<IEventsWebPartProps> {

  public render(): void {
    // var ajax = new XMLHttpRequest();
    // ajax.open("GET", "/src/webparts/todo/landingtemplate.html", false);
    // ajax.send();
    // this.domElement.innerHTML = ajax.responseText;

    //this.domElement.innerHTML = LandingTemplate.templateHtml;

    this.domElement.innerHTML = `
      <div class="${styles.events}" data-ng-controller="HomeController as vm">
      <table>
          <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Event Title</th>
          </tr>
          <tr>
              <td></td>
              <td></td>
              <td></td>
          </tr>
          <select name="" id="">
              <option value=""></option>
          </select>
          <div><input type="text" id="txtFullName"></div>
          <div><input type="text" id="txtEmail"></div>
          <div><input type="button" id="btnRegister" value="Register"></div>
          <div ng-show="{{vm.showpastevents}}">
              <table>
                  <tr>
                      <th>Event Title</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Total Count</th>
                  </tr>
                  <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
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
      </table>
  </div>`;
    angular.bootstrap(this.domElement, ['eventsapp']);
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
                PropertyPaneCheckbox('showpastevents', {
                  text: strings.ShowPastEventsFieldLabel
                })

              ]
            }
          ]
        }
      ]
    };
  }
}
