import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-hamburger-menu',
  styleUrl: './hamburger-menu.scss',
  templateUrl: './hamburger-menu.html',
})
export class HamburgerMenu {
  @Output() closeMenu = new EventEmitter<void>();
}
