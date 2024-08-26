import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { MainComponent } from '../../pages/main/main.component';
import { FormsModule } from '@angular/forms';
import { DemoComponent } from '../../pages/demo/demo.component';
import { HomeComponent } from '../../pages/home/home.component';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, FooterComponent, MainComponent,FormsModule, DemoComponent, FooterComponent, HomeComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
