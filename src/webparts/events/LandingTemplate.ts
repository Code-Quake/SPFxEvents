import styles from './EventsWebPart.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

export default class LandingTemplate {
    public static templateHtml: string =  `
    <div class="${styles.events}" data-ng-controller="HomeController as vm">
    <table class="${styles.table}">
        <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Event Title</th>
            <th>Delete</th>
        </tr>
        <tr data-ng-repeat="attendee in vm.attendeeCollection track by $index">
            <td>{{attendee.FullName1}}</td>
            <td>{{attendee.Email}}</td>
            <td>{{attendee.EventID}}</td>
            <td>
                <input type="button" id="btnDeleteAttendee" value="Delete" data-ng-click="vm.DeleteAttendee(attendee.ID)">
            </td>
        </tr>
    </table>
    <table>
        <tr>
            <td>
                <select name="" id="">
                    <option data-ng-repeat="event in vm.eventCollection track by $index" ng-value="event.ID">{{event.Title}}</option>
                </select>
            </td>
            <td>Full Name:</td>
            <td>
                <input type="text" id="txtFullName">
            </td>
            <td>Email:</td>
            <td>
                <input type="text" id="txtEmail">
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
                <th>Delete</th>
            </tr>
            <tr data-ng-repeat="event in vm.eventCollection track by $index">
                <td>{{event.Title}}</td>
                <td>{{event.StartDate | date: 'MM/dd/yyyy hh:mm'}}</td>
                <td>{{event.EndDate | date: 'MM/dd/yyyy hh:mm'}}</td>
                <td>{{event.Campus}}</td>
                <td>{{event.TotalAttendees}}</td>
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
}
