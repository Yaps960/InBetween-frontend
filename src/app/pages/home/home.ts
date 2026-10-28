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
  selectedFriend: string | null = null;

  constructor (public authService: AuthService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleFriendsList() {
    this.isFriendsListOpen = !this.isFriendsListOpen;
  }

  openChat(friend: string) {
    this.selectedFriend = friend;
  }

  closeChat() {
    this.selectedFriend = null;
  }
}
