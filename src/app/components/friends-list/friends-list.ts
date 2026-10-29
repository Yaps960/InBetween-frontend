import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-friends-list',
  styleUrl: './friends-list.scss',
  templateUrl: './friends-list.html',
})
export class FriendsList {
  @Output() selectFriend = new EventEmitter<string>();
  @Output() closeFriends = new EventEmitter<void>();

  friends: string[] = ["Irelia", "Gnar"];
}
