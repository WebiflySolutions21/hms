export const LOGIN_ROUTES = [
    {
        id:9,
        title:"Super Admin",
        path:"/super-admin",
        identification:"super-admin"
    },
    {
        id:1,
        title:"Admin Login",
        path:"/admin",
        identification:"admin"

    },
    {
        id:2,
        title:"Reception Login",
        path:"/reception",
        identification:"reception"
        
    },
    {
        id:3,
        title:"Staff Login",
        path:"/staff",
        identification:"staff"
        
    },
    {
        id:4,
        title:"Doctor Login",
        path:"/doctor",
        identification:"doctor"
        
    },
    {
        id:5,
        title:"Opthalmologist Login",
        path:"/opthalmologist",
        identification:"opthal"
        
    },
    {
        id:6,
        title:"Medical Login",
        path:"/medical",
        identification:"medical"
    },
    {
        id:7,
        title:"Lab Login",
        path:"/lab",
        identification:"lab"
    },{
        id:8,
        title:"Book Appointment",
        path:"/appointment",
        identification:"appointment"
    },
    {
        id:8,
        title:"Shift",
        path:"/shift-admin",
        identification:"shift"
    },
]

export const LOGIN_TYPE_LANDING_PAGE=[
    { item_id: 1, item_text: 'Staff',path:"/staff",id:"staff" },
    { item_id: 2, item_text: 'Doctor',path:"/doctor",id:"doctor" },
    { item_id: 3, item_text: 'Reception' ,path:"/reception",id:"reception"},
    { item_id: 4, item_text: 'Opthalmologist',path:"/opthal",id:"opthal" },
    { item_id: 5, item_text: 'Medical',path:"/medical",id:"medical" },
    { item_id: 6, item_text: 'Lab' ,path:"/lab",id:"lab"},
  ];
  
export const INPUT_TYPES = [
    { value: 'text', label: 'Text', placeholder: 'Enter text here' },
    { value: 'password', label: 'Password', placeholder: 'Enter your password' },
    { value: 'email', label: 'Email', placeholder: 'Enter your email' },
    { value: 'number', label: 'Number', placeholder: 'Enter a number' },
    { value: 'datetime', label: 'Date', placeholder: '' },
    { value: 'file', label: 'File', placeholder: '' },
    { value: 'checkbox', label: 'Checkbox', placeholder: '' },
    { value: 'radio', label: 'Radio', placeholder: '' },
  ];

export interface IFormValueData {
    isSubmit:boolean,
    isPreload:boolean,
    data:any
}
export interface DynamicFormConfig {
    id: number;
    loginType: string; // e.g., "Staff Login", "Doctor Login"
    formName: string;  // e.g., "Admission Form"
    fields: FormField[]; // Array of form fields
  }
  
  export interface FormField {
    label: string;
    type: string; // e.g., text, number, date, select
    required: boolean;
    options?: string[]; // for dropdowns
  }
  
  export const DOCTOR_CONFIG_DASHBOARD_CONFIGURATION = [
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
      name: 'Type of Medicine',
      isEnabled: true,
      data_bs_target: '#addTypeOfMedicineModal',

      actions: [
        {
          label: 'Add Medicine Type',
          class: 'btn btn-primary',
          action: 'add-medicine-type',
        },
      ],
    },
    {
      name: 'Medicine Taking Period(When to take)',
      isEnabled: true,
      data_bs_target: '#addMedicinePeriodModal',
      actions: [
        {
          label: 'Add Medicine Period',
          class: 'btn btn-primary',
          action: 'add-medicine-period',
        },
      ],
    },

    {
      name: 'Prescription Template Creation',
      isEnabled: true,
      actions: [
        {
          label: 'Create Template',
          class: 'btn btn-primary',
          action: 'create-template',
        },
      ],
    },

    {
      name: 'Show LMP,GA,EDT ',
      isEnabled: true,
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
    {
      name: 'Show Patient Details Section',
      isEnabled: true,
    },
  ];