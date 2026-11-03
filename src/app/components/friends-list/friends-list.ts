import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-friends-list',
  styleUrl: './friends-list.scss',
  templateUrl: './friends-list.html',
})
export class FriendsList {
  @Output() selectFriend = new EventEmitter<string>();
  @Output() closeFriends = new EventEmitter<void>();

  friends: string[] = ["Irelia", "Gnar"];

  searchQuery = '';

  get filteredFriends(): string[] {
    const query = this.searchQuery.trim().toLowerCase();

    return this.friends.filter(friend =>
      friend.toLowerCase().includes(query)
    );
  }
}
