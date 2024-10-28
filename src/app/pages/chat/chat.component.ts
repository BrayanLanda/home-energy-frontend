import { Component } from '@angular/core';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { OpeniaService } from '../../services/openia.service';
import { Message } from '../../models/message';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [SidebarComponent, RouterLink, NgClass, FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  messages: Message[] = [];
  userInput: string = '';
  isLoading = false;

  constructor(private openAIService: OpeniaService) {}

  sendMessage() {
    if (this.userInput.trim() && !this.isLoading) {
      // Agregar mensaje del usuario
      this.messages.push({ text: this.userInput, isUser: true });
      
      // Activar indicador de carga
      this.isLoading = true;

      // Guardar el input y limpiarlo
      const messageText = this.userInput;
      this.userInput = '';

      // Llamada a OpenAI
      this.openAIService.sendMessage(messageText).subscribe({
        next: (response) => {
          const aiMessage = response.choices[0].message.content;
          this.messages.push({ text: aiMessage, isUser: false });
          this.isLoading = false;
        },
        error: (error) => {
          this.messages.push({
            text: error,
            isUser: false,
            isError: true
          });
          this.isLoading = false;
        },
      });
    }
  }
}
