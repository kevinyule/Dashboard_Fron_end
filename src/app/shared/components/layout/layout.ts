import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [Header, Sidebar, Footer, RouterOutlet],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export default class Layout {

}
