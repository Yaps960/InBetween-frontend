import { Component, OnInit } from '@angular/core';
import { Header } from '../../components/header/header';
import { HamburgerMenu } from '../../components/hamburger-menu/hamburger-menu';
import { FriendsList } from '../../components/friends-list/friends-list';
import { Chatbox } from '../../components/chatbox/chatbox';
import { Post } from '../../components/post/post';
import { AuthService } from '../../services/auth.service';

interface PostData {
  id: number;
  content: string;
}

@Component({
  imports: [Header, HamburgerMenu, FriendsList, Chatbox, Post],
  selector: 'app-profile',
  styleUrl: './profile.scss',
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  isMenuOpen = false;
  isPostOpen = false;
  isFriendsListOpen = false;

  openChats: string[] = [];
  posts: PostData[] = [];

  private readonly storageKey = 'home-posts';

  constructor (public authService: AuthService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    const savedPosts = localStorage.getItem(this.storageKey);

    if (savedPosts) {
      try {
        this.posts = JSON.parse(savedPosts);
      } catch {
        this.posts = [];
      }
    }
  }

  addPost(content: string): void {
    const newPost: PostData = {
      id: Date.now(),
      content: content
    };

    this.posts = [newPost, ...this.posts];

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.posts)
    );

    this.isPostOpen = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  togglePost() {
    this.isPostOpen = !this.isPostOpen;
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
