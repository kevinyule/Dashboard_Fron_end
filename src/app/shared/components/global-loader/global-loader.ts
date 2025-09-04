import { CommonModule } from '@angular/common';
import { Component, Input, } from '@angular/core';


@Component({
  selector: 'app-global-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './global-loader.html',
  styleUrls: ['./global-loader.css']
})
export default class GlobalLoader {
  @Input() active: boolean = false; // recibe el valor del padre
  @Input() text: string = 'Cargando...'; // opcional: mensaje personalizable

}
