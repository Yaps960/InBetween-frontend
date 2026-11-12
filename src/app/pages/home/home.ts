import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  imports: [FormsModule, Header, HamburgerMenu, FriendsList, Chatbox, Post],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})

export class Home implements OnInit{
  isMenuOpen = false;
  isPostOpen = false;
  isFriendsListOpen = false;

  openChats: string[] = [];
  posts: PostData[] = [];

  editingPostId: number | null = null;
  editedContent = '';
  activeMenuId: number | null = null;

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

  togglePostMenu(
    postId: number,
    event: MouseEvent
  ): void {
    event.stopPropagation();

    this.activeMenuId =
      this.activeMenuId === postId ? null : postId;
  }

  editPost(post: PostData): void {
    this.editingPostId = post.id;
    this.editedContent = post.content;

    this.activeMenuId = null;
  }

  cancelEdit(): void {
    this.editingPostId = null;
    this.editedContent = '';
  }

  saveEdit(postId: number): void {
    const content = this.editedContent.trim();

    if (!content) {
      return;
    }

    this.posts = this.posts.map(post =>
      post.id === postId
        ? { ...post, content: content }
        : post
    );

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.posts)
    );

    this.cancelEdit();
  }

  deletePost(postId: number): void {
    const confirmed = confirm(
      'Are you sure you want to delete this post?'
    );

    if (!confirmed) {
      return;
    }

    this.posts = this.posts.filter(
      post => post.id !== postId
    );

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.posts)
    );

    this.activeMenuId = null;
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
