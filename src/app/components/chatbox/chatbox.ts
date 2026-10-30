import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChatService, ChatMessage } from '../../services/chat.service';

@Component({
  imports: [],
  selector: 'app-chatbox',
  styleUrl: './chatbox.scss',
  templateUrl: './chatbox.html',
})
export class Chatbox implements OnChanges {
  @Input() friend = '';
  @Output() closeChat = new EventEmitter<void>();

  messages: ChatMessage[] = [];

  constructor(private chatService: ChatService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['friend'] && this.friend) {
      this.messages = this.chatService.getMessages(this.friend);
    }
  }

  sendMessage(event: SubmitEvent, input: HTMLInputElement): void {
    event.preventDefault();

    const text = input.value.trim();

    if(!text) {
      return;
    }

    this.chatService.sendMessage(this.friend, text);

    this.messages = this.chatService.getMessages(this.friend);

    input.value = '';
    input.focus();
  }
}
