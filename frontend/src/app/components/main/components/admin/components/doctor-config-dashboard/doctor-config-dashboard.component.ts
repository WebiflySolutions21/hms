import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-config-dashboard',
  templateUrl: './doctor-config-dashboard.component.html',
  styleUrls: ['./doctor-config-dashboard.component.scss'],
})
export class DoctorConfigDashboardComponent {
  configList = [
    {
      name: 'View Config',
      isEnabled: true,
      actions: [
        {
          label: 'Create Config',
          class: 'btn btn-primary',
          action: 'create-config',
        },
      ],
    },
    {
      name: 'Show OT',
      isEnabled: true,
    },
    {
      name: 'Show OPD',
      isEnabled: false,
    },
    {
      name: 'Show IPD',
      isEnabled: true,
    },
    {
      name: 'Show Opthal',
      isEnabled: true,
    },
    {
      name: 'Show All Data',
      isEnabled: true,
    },
    {
      name: 'Show Respective Type Data',
      isEnabled: true,
    },
    {
      name: 'Show View Button',
      isEnabled: true,
    },
    {
      name: 'Show Reports',
      isEnabled: true,
    },
    {
      name: 'Show Global Search',
      isEnabled: true,
    },
    {
      name: 'Show FollowUp Button',
      isEnabled: true,
    },
    {
      name: 'Show Admit Patient Button',
      isEnabled: true,
    },
    {
      name: 'Show Refer Patient Button',
      isEnabled: true,
    },
    {
      name: 'Show Canvas Button',
      isEnabled: true,
    },
    {
      name: 'Show Image Gallery Button',
      isEnabled: true,
    },
    {
      name: 'Show Prescription Heading',
      isEnabled: true,
    },
    {
      name: 'Show Heading in  Footer',
      isEnabled: true,
    },
    {
      name: 'Show Prescription',
      isEnabled: true,
    },
  ];

  constructor(private router:Router){}

  onToggleChange(config: any) {
    config.isEnabled = !config.isEnabled
    console.log(
      `Config "${config.name}" toggled to:`,
      config.isEnabled ? 'Active' : 'Inactive'
    );
  }

  handleAction(action: any) {
    switch(action.action){
      case 'create-config':
        this.router.navigate(['/main/admin/doctor-config-dashboard/doctor-config'])
    }
  }
}
