import { Component } from '@angular/core';
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consumption',
  standalone: true,
  imports: [SidebarComponent, RouterLink],
  templateUrl: './consumption.component.html',
  styleUrl: './consumption.component.css'
})
export class ConsumptionComponent {

}
