import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [SidebarComponent, HeaderComponent, BreadcrumbsComponent],
  exports: [SidebarComponent, HeaderComponent, BreadcrumbsComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
