import { Component } from '@angular/core';
import Profile from '../profile/profile';
import Tables from '../tables/tables';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Profile, Tables],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export default class Dashboard {

}
