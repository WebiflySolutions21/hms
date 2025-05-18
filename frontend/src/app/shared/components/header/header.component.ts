import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() hospitalName!: string;
  @Input() headingRoutes: { title: string; path: string }[] = [];
  @Input() loginDetails;
  isDropdownOpen = false;
  isMenuOpen = false;
  isMobileView = window.innerWidth <= 768; // Detect if it's a mobile view
  @Output() titleClick = new EventEmitter<{ title: string; path: string }>();
  jwtDecodedData: any;
  isDoctorDetailsVisible = false;
  selectedRole: any;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.hospitalName = JSON.parse(localStorage.getItem('hospitalFormData'));
    this.jwtDecodedData = this.authenticationService.getJwtDecodedData();
    console.log('jwtDecodedData', this.jwtDecodedData);
    // Listen to window resize to update isMobileView
    window.addEventListener('resize', () => {
      this.isMobileView = window.innerWidth <= 768;
    });
    document.addEventListener('click', this.onOutsideClick.bind(this));
     this.selectedRole = localStorage.getItem('selectedRole') || '';
  }

  switchRole(role: string) {
    this.selectedRole = role;
    localStorage.setItem('selectedRole', role);
    this.router.navigate([`/main/${role}/${role}-dashboard`]);
  }
  getIcon(role: string): string {
    const roleIconMap: { [key: string]: string } = {
      admin: 'fas fa-user-shield',
      'super-admin': 'fas fa-crown',
      staff: 'fas fa-users',
      reception: 'fas fa-concierge-bell',
      doctor: 'fas fa-user-md',
      lab: 'fas fa-vials',
      medical: 'fas fa-pills',
    };
    return roleIconMap[role] || 'fas fa-user';
  }

  ngOnDestroy() {
    // Cleanup the event listener
    document.removeEventListener('click', this.onOutsideClick.bind(this));
  }

  toggleDoctorDetails() {
    this.isDoctorDetailsVisible = !this.isDoctorDetailsVisible;
  }

  onOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.doctor-container')) {
      this.isDoctorDetailsVisible = false;
    }
  }

  logout() {
    console.log('Logged out!');
    localStorage.removeItem('userInfo');
    this.router.navigate(['/landing']);
    // Perform logout logic here
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onTitleClick(data: { title: string; path: string }) {
    this.titleClick.emit(data);
    this.isMenuOpen = false; // Close menu after clicking
    this.isDropdownOpen = false; // Close dropdown after selection
  }
}
