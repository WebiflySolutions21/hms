export const PATIENT_ROUTES = [
  {
    id: 1,
    title: 'Dashboard',
    path: '/patient-dashboard',
  },
  {
    id: 2,
    title: 'Book Appointment',
    path: '/appointment',
  },
  
];

export const PATIENT_TABLE_DATA = {
  patient: [
    {
      id: 1,
      regDate: '02/02/2024',
      hospitalName:'Shri Siddhivinayak Netralaya',
      patientName: 'Lokesh Thakare',
      sex: 'Male',
      age: '26',
      contactNo: '7218509409',
      type: 'Registration',
      visitCount: '8',
      consultantType:"eye",
      consultantName:"Dr. Abhay Patil",
    },
    {
      id: 2,
      regDate: '03/02/2024',
      hospitalName:'Shri Siddhivinayak Netralaya',

      patientName: 'Devesh Thakare',
      sex: 'Male',
      age: '21',
      contactNo: '8208030973',
      type: 'Appointment',
      visitCount: '12',
      consultantType:"eye",
      consultantName:"Dr. Abhay Patil",
    },
    {
      id: 3,
      regDate: '22/02/2024',
      hospitalName:'Shri Siddhivinayak Netralaya',

      patientName: 'Lokesh Thakare',
      sex: 'Male',
      age: '26',
      contactNo: '7218509409',
      type: 'Follow Up',
      visitCount: '3',
      consultantType:"eye",
      consultantName:"Dr. Abhay Patil",
    },
  ],
};
export const PATIENT_TABLE_COLUMNS = {
  patient: [
    { key: 'id', title: 'ID' },
    { key: 'regDate', title: 'Registration Date', filterType: 'date' },
    { key: 'patientName', title: 'Patient Name',filterType: 'search',type:"text" },
    { key: 'sex', title: 'Sex', filterType: 'dropdown',
      options: ['Male', 'Female', 'Others'], },
    { key: 'age', title: 'Age' },
    { key: 'contactNo', title: 'Contact No', filterType: 'search' ,type:"number"},
    { key: 'consultantName', title: 'Consultant Name', filterType: 'search' ,type:"text"},

    { key: 'consultantType', title: 'Type', filterType: 'search' ,type:"text"},

    {
      key: 'type',
      title: 'Type',
      filterType: 'dropdown',
      options: ['Registration', 'Appointment', 'Follow Up'],
    },
    { key: 'visitCount', title: 'Visit No.' },
  ],
};