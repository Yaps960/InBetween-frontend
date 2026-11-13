import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  isDropdownOpen = false;

  searchQuery = ''

  @Output() menuToggle = new EventEmitter<void>();
  @Output() postToggle = new EventEmitter<void>();

  @Output() search = new EventEmitter<string>();

  constructor(public authService: AuthService) {}

  dropdownToggle() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  submitSearch(): void {
    this.search.emit(this.searchQuery.trim());
  }
}
