export const STAFF_TABLE_DATA = {
    patient: [
      {
        id: 1,
        regDate: '02/02/2024',
        patientName: 'Lokesh Thakare',
        sex: 'Male',
        age: '26',
        contactNo: '7218509409',
        type: 'Registration',
        refer: 'Not Referred',
        visitCount: '8',
        isAdmitted: true,
        isViewed: true,
        consultantType: 'eye',
        consultantName: 'Dr. Abhay Patil',
      },
      {
        id: 2,
        regDate: '03/02/2024',
        patientName: 'Devesh Thakare',
        sex: 'Male',
        age: '21',
        contactNo: '8208030973',
        type: 'Appointment',
        refer: 'Not Referred',
        visitCount: '12',
        isAdmitted: false,
        isViewed: false,
        consultantType: 'eye',
        consultantName: 'Dr. Abhay Patil',
      },
      {
        id: 3,
        regDate: '22/02/2024',
        patientName: 'Lokesh Thakare',
        sex: 'Male',
        age: '26',
        contactNo: '7218509409',
        type: 'Follow Up',
        refer: 'Not Referred',
        visitCount: '3',
        isAdmitted: true,
        isViewed: true,
        consultantType: 'eye',
        consultantName: 'Dr. Abhay Patil',
      },
      {
        id: 4,
        regDate: '23/02/2024',
        patientName: 'Lokesh Thakare',
        sex: 'Male',
        age: '26',
        contactNo: '7218509409',
        type: 'Registration',
        refer: 'Not Referred',
        visitCount: '1',
        isAdmitted: false,
        isViewed: true,
        consultantType: 'eye',
        consultantName: 'Dr. Abhay Patil',
      },
      {
        id: 5,
        regDate: '12/02/2024',
        patientName: 'Lokesh Thakare',
        sex: 'Male',
        age: '26',
        contactNo: '7218509409',
        type: 'Registration',
        refer: 'Referred',
        visitCount: '5',
        isAdmitted: true,
        isViewed: true,
        consultantType: 'eye',
        consultantName: 'Dr. Abhay Patil',
      },
      {
        id: 6,
        regDate: '10/02/2024',
        patientName: 'Lokesh Thakare',
        sex: 'Male',
        age: '26',
        contactNo: '7218509409',
        type: 'Registration',
        refer: 'Referred',
        visitCount: '2',
        isAdmitted: true,
        isViewed: true,
        consultantType: 'eye',
        consultantName: 'Dr. Abhay Patil',
      },
    ],
  };
  export const STAFF_TABLE_COLUMNS = {
    patient: [
      { key: 'id', title: 'ID' },
      { key: 'regDate', title: 'Registration Date', filterType: 'date' },
      {
        key: 'patientName',
        title: 'Patient Name',
        filterType: 'search',
        type: 'text',
      },
      {
        key: 'sex',
        title: 'Sex',
        filterType: 'dropdown',
        options: ['Male', 'Female', 'Others'],
      },
      { key: 'age', title: 'Age' },
      {
        key: 'contactNo',
        title: 'Contact No',
        filterType: 'search',
        type: 'number',
      },
      {
        key: 'type',
        title: 'Type',
        filterType: 'dropdown',
        options: ['Registration', 'Appointment', 'Follow Up'],
      },
      {
        key: 'refer',
        title: 'Refer Status',
        filterType: 'dropdown',
        options: ["Referred","Not Referred"],
      },
      { key: 'visitCount', title: 'Visit No.' },
    ],
  };
  
  export const STAFF_ROUTES = [
    {
      id: 1,
      title: 'Registers',
      path: '/registers',
    },

  ];