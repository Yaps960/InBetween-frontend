import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { HamburgerMenu } from '../../components/hamburger-menu/hamburger-menu';
import { FriendsList } from '../../components/friends-list/friends-list';
import { Chatbox } from '../../components/chatbox/chatbox';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [Header, HamburgerMenu, FriendsList, Chatbox],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})

export class Home {
  isMenuOpen = false;
  isFriendsListOpen = false;
  openChats: string[] = [];

  constructor (public authService: AuthService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleFriendsList() {
    this.isFriendsListOpen = !this.isFriendsListOpen;
  }

  openChat(friend: string): void {
    if (this.openChats.includes(friend)) {
      return;
    }

    this.openChats = [...this.openChats, friend];
  }

  closeChat(friend: string): void {
    this.openChats = this.openChats.filter(
      (openFriend) => openFriend !== friend
    );
  }
}
