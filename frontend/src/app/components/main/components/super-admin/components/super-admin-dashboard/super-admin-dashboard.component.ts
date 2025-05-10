import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  SUPER_ADMIN_TABLE_COLUMNS,
  SUPER_ADMIN_TABLE_DATA,
} from '@assets/constants/super-admin.constants';
import { ToastrService } from 'ngx-toastr';
import { HospitalService } from 'src/app/core/services';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.scss'],
})
export class SuperAdminDashboardComponent implements OnInit {
  tableData: any;
  editFormData: any = {};
showEditModal: boolean = false;

  actionType: any;
  popUpConfirmData: any;
  filteredTableData: any;
  tableColumns: any = SUPER_ADMIN_TABLE_COLUMNS;
  showConfirmDialog = false;
  title: any;
  message: any;

  constructor(
    private router: Router,
    private hospitalService: HospitalService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getHospitalList();
  }

  getHospitalList() {
    this.hospitalService.getHospitalList().subscribe(
      (res: any) => {
        this.tableData = res;
        this.filteredTableData = this.tableData;
      },
      (err: any) => {
        this.toastrService.error(
          'Error In Hospital Registration',
          err?.error?.errorMessage
        );
      }
    );
  }

  handleAction(event: any) {
    console.log('event', event);
    switch (event.action) {
      case 'edit':
        this.editFormData = { ...event.row }; // Copy the data for binding to form
        console.log(this.editFormData)
        this.showEditModal = true;
        break;
      case 'revoke':
        this.title = `Revoke ${event.row.name}`;
        this.message = `Are you sure you want to revoke this ${event.row.name}?`;
        this.openConfirm(event?.action, event.row);
        break;
      case 'configView':
        console.log(event.row);
        this.router.navigate(['/main/super-admin/hospital-config-details'], {
          queryParams: { id: event.row.id, name: event.row.name },
        });
        break;
    }
  }

  

  saveEdit() {
    const index = this.tableData.findIndex((item: any) => item.id === this.editFormData.id);
    if (index > -1) {
      this.tableData[index] = { ...this.editFormData };
      this.filteredTableData = [...this.tableData]; // trigger change detection

    let payload = { ...this.filteredTableData[index] };
    this.hospitalService.editHospital(payload).subscribe(
      (res) => {
        console.log('Response:', res);
        this.getHospitalList();
        this.toastrService.success('Hospital Details Updated Successfully', 'Success');
      },
      (err) => {
        console.error('Error:', err);
        this.toastrService.error('Error In Updating Hospital Details', err?.error?.errorMessage);
      }
    )}

  
    this.showEditModal = false;
  }

  
  handleDeleteHospital(data: any) {
    console.log('Delete Hospital', this.title);
  }
  handleRevokeHospital(data: any) {
    console.log('Revoke Hospital', this.title);
  }

  openConfirm(action: any, data: any) {
    this.actionType = action;
    this.popUpConfirmData = data;
    this.showConfirmDialog = true;
  }

  handleConfirm() {
    if (!this.popUpConfirmData) return;
    this.showConfirmDialog = false;
    switch (this.actionType) {
      case 'delete':
        this.handleDeleteHospital(this.popUpConfirmData);
        break;
      case 'revoke':
        this.handleRevokeHospital(this.popUpConfirmData);
        break;
      default:
        console.warn('Unknown action:', this.actionType);
        break;
    }
  }

  handleCancel() {
    console.log('Cancelled!');
    this.showConfirmDialog = false;
    return false;
  }
}
