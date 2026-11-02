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

  shouldShowTimestamp(
    current: ChatMessage,
    previous?: ChatMessage
  ): boolean {
      if (!previous) {
        return true;
      }

    const currentDate = new Date(current.timestamp);
    const previousDate = new Date(previous.timestamp);

    const differentDay = currentDate.toDateString() !== previousDate.toDateString();
    const minutesDifference = (currentDate.getTime() - previousDate.getTime()) / 60000;

    return differentDay || minutesDifference >= 5;
  }

  formatTime(timestamp: Date | string | number): string {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatDateTime(timestamp: Date | string | number): string {
    return new Date(timestamp).toLocaleString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
