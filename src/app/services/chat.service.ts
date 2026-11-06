import { Injectable } from '@angular/core';

export interface ChatMessage {
  id: number;
  text: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly storageKey = 'chatMessages';

  private conversations: {
    [friend: string]: ChatMessage[];
  } = {};

  constructor() {
    this.loadMessages();
  }

  private loadMessages(): void {
    const savedMessages = localStorage.getItem(this.storageKey);

    if (!savedMessages) {
      return;
    }

    try {
      this.conversations = JSON.parse(savedMessages);

      for (const friend in this.conversations) {
        this.conversations[friend] =
          this.conversations[friend].map(messages => ({
            ...messages,
            timestamp: new Date(messages.timestamp)
          }));
      }
    } catch {
      this.conversations = {};
    }
  }

  private saveMessages(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.conversations)
    );
  }

  getMessages(friend: string): ChatMessage[] {
    return [...(this.conversations[friend] || [])];
  }

  sendMessage(friend: string, text: string): void {
    if (!this.conversations[friend]) {
      this.conversations[friend] = [];
    }

    const message: ChatMessage = {
      id: Date.now(),
      text,
      timestamp: new Date()
    };

    this.conversations[friend].push(message);

    this.saveMessages();
  }

  editMessage(
    friend: string,
    messageId: number | string,
    newText: string
  ): void {
    const messages = this.conversations[friend];

    const message = messages.find(
      m => m.id === messageId
    );

    if (!message) {
      return;
    }

    message.text = newText;

    this.saveMessages();
  }

  deleteMessage(
    friend: string,
    messageId: number | string
  ): void {
    const messages = this.conversations[friend];

    if (!messages) {
      return;
    }

    this.conversations[friend] = messages.filter(
      message => message.id !== messageId
    );

    this.saveMessages();
  }
}
