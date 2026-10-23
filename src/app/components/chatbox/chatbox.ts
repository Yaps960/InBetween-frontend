import { Component, EventEmitter, Output, Input, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-chatbox',
  styleUrl: './chatbox.scss',
  templateUrl: './chatbox.html',
})
export class Chatbox {
  @Input() friend = '';
  @Output() closeChat = new EventEmitter<void>();

  messages: {
    id: number,
    text: string
  }[] = [];

  private nextMessageId = 0;

  sendMessage(event: SubmitEvent, input: HTMLInputElement): void {
    event.preventDefault();

    const text = input.value.trim();

    if(!text) {
      return;
    }

    this.messages.push({
      id: this.nextMessageId++,
      text,
    });

    input.value = '';
    
    input.focus();
  }
}
