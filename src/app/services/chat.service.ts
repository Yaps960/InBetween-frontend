import { Injectable } from '@angular/core';

export interface ChatMessage {
  id: number;
  text: string;
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
      text
    };

    this.conversations[friend].push(message);

    this.saveMessages();
  }
}