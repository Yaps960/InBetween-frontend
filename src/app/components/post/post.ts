import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-post',
  styleUrl: './post.scss',
  templateUrl: './post.html',
})
export class Post {
  @Output() closePost = new EventEmitter<void>();
  @Output() postSubmit = new EventEmitter<string>();

  postContent = '';

  submitPost(): void {
    const content = this.postContent.trim();

    if (!content) {
      return;
    }

    this.postSubmit.emit(content);
  }
}
