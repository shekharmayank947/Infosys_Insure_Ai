import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme = signal<'light' | 'dark'>((localStorage.getItem('theme') as 'light' | 'dark') || 'light');

  constructor() {
    effect(() => {
      const currentTheme = this.theme();
      localStorage.setItem('theme', currentTheme);
      if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  }

  toggleTheme() {
    this.theme.update(t => t === 'light' ? 'dark' : 'light');
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme.set(theme);
  }
}
