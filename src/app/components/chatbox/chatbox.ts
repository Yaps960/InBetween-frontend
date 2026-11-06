import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChatService, ChatMessage } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-chatbox',
  styleUrl: './chatbox.scss',
  templateUrl: './chatbox.html',
})
export class Chatbox implements OnChanges {
  @Input() friend = '';
  @Output() closeChat = new EventEmitter<void>();

  messages: ChatMessage[] = [];

  isCollapsed = false;

  constructor(private chatService: ChatService) {}

  toggleChat(): void {
    this.isCollapsed = !this.isCollapsed;
  }

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

  editingMessageId: number | string | null = null;
  editedText = '';
  activeMenuId: number | string | null = null;

  toggleMessageMenu(
    messageId: number | string,
    event: MouseEvent
  ): void {
    event.stopPropagation();

    this.activeMenuId =
      this.activeMenuId === messageId ? null : messageId;
  }

  editMessage(message: ChatMessage): void {
    this.editingMessageId = message.id;
    this.editedText = message.text;
    this.activeMenuId = null;
  }

  cancelEdit(): void {
    this.editingMessageId = null;
    this.editedText = '';
  }

  saveEdit(messageId: number | string): void {
    const text = this.editedText.trim();

    if (!text) {
      return;
    }

    this.chatService.editMessage(
      this.friend,
      messageId,
      text
    );

    this.messages = this.chatService.getMessages(this.friend);

    this.cancelEdit();
  }

  deleteMessage(messageId: number | string): void {
    const confirmed = confirm(
      'Are you sure you want to delete this message?'
    );

    if (!confirmed) {
      return;
    }

    this.chatService.deleteMessage(
      this.friend,
      messageId
    );

    this.messages = this.chatService.getMessages(this.friend);

    this.activeMenuId = null;
  }
}
