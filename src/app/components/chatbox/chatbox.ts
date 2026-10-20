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
}
