import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public linkTheme = document.querySelector('#theme');

  constructor() {
    const url = localStorage.getItem('theme') || './assets/css/colors/dark.css';
    this.linkTheme?.setAttribute('href', url);
  }
  ChangeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;

    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const link = document.querySelectorAll('.selector');

    link.forEach((e) => {
      e.classList.remove('working');
      const btnTheme = e.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currenteTheme = this.linkTheme?.getAttribute('href');
      if (btnThemeUrl === currenteTheme) {
        e.classList.add('working');
      }
    });
  }
}
