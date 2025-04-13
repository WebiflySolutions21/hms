export const SUPER_ADMIN_ROUTES = [
    {
      id: 1,
      title: 'Register Hospital',
      path: '/hospital-registration',
    },
    {
      id: 2,
      title: 'Form Configurations',
      path: '/configurations',
    },
  ];

  export const SUPER_ADMIN_VIEW_ROUTES = [
    {
      id:3,
      title:'Dashboard',
      path:'super-admin-dashboard'
    },
    {
      id: 1,
      title: 'Register Hospital',
      path: '/hospital-registration',
    },
    {
      id: 2,
      title: 'Form Configurations',
      path: '/configurations',
    },
  ];


  export const SUPER_ADMIN_TABLE_DATA = [
    {
      id: 1,
      regDate: '2023/10/01',
      name: 'ABC Hospital',
      mobile: '1234567890',
      hospRegNo: 'H123456',
      address: '123 Main St, City, Country',
    },
    {
      id: 2,
      regDate: '2023/10/02',
      name: 'City General Hospital',
      mobile: '2345678901',
      hospRegNo: 'H234567',
      address: '456 Oak Ave, Metropolis, Country',
    },
    {
      id: 3,
      regDate: '2023/10/03',
      name: 'Green Valley Medical Center',
      mobile: '3456789012',
      hospRegNo: 'H345678',
      address: '789 Pine Rd, Valley, Country',
    },
    {
      id: 4,
      regDate: '2023/10/04',
      name: 'Sunshine Children\'s Hospital',
      mobile: '4567890123',
      hospRegNo: 'H456789',
      address: '321 Elm St, Sunnyville, Country',
    },
    {
      id: 5,
      regDate: '2023/10/05',
      name: 'Golden State Medical',
      mobile: '5678901234',
      hospRegNo: 'H567890',
      address: '654 Maple Dr, Goldentown, Country',
    },
    {
      id: 6,
      regDate: '2023/10/06',
      name: 'Prestige Healthcare',
      mobile: '6789012345',
      hospRegNo: 'H678901',
      address: '987 Cedar Ln, Prestigeville, Country',
    },
    {
      id: 7,
      regDate: '2023/10/07',
      name: 'Unity Community Hospital',
      mobile: '7890123456',
      hospRegNo: 'H789012',
      address: '159 Birch Blvd, Unitytown, Country',
    },
    {
      id: 8,
      regDate: '2023/10/08',
      name: 'Advanced Surgical Center',
      mobile: '8901234567',
      hospRegNo: 'H890123',
      address: '753 Willow Way, Techcity, Country',
    },
    {
      id: 9,
      regDate: '2023/10/09',
      name: 'Heritage Medical Institute',
      mobile: '9012345678',
      hospRegNo: 'H901234',
      address: '426 Redwood Ave, Heritage, Country',
    },
    {
      id: 10,
      regDate: '2023/10/10',
      name: 'Metropolitan Health Services',
      mobile: '0123456789',
      hospRegNo: 'H012345',
      address: '864 Spruce St, Metroville, Country',
    }
  ];
  export const SUPER_ADMIN_LOGIN_TYPES = [
    {id:1,name:'Doctor',value:'doctor'},
    {id:2,name:'Staff',value:'staff'},
    {id:3,name:'Receptionist',value:'receptionist'},  
    {id:4,name:'Medical',value:'medical'},
    {id:5,name:'Lab',value:'lab'},
    {id:6,name:'Admin',value:'admin'},
  ];
export const SUPER_ADMIN_TABLE_COLUMNS = [
    { key: 'id', title: 'ID' },
    { key: 'regDate', title: 'Registration Date', filterType: 'date' },
    {
      key: 'name',
      title: 'Hospital Name',
      filterType: 'search',
      type: 'text',
    },
    {
      key:'address',
      title:'Address',
      filterType: 'search',
      type: 'text',
    },
    {
      key: 'mobile',
      title: 'Hospital Contact No',
      filterType: 'search',
      type: 'number',
    },
    {
      key:'hospRegNo',
      title:'Hospital Registration No',
      filterType: 'search',
      type: 'text',
    }
  ]