import { Component } from '@angular/core';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SidebarComponent, RouterLink, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user = {
    name: 'John Doe',
    role: 'Full Stack Developer',
    password: '',  // se usará solo para actualizar
    skills: ['Angular', 'Spring Boot', 'TypeScript', 'Java'],
    profilePicture: 'https://via.placeholder.com/150'
  };

  updateProfile() {
    console.log('Profile updated:', this.user);
    // Aquí, más adelante, podrás enviar los datos al backend
  }
}
