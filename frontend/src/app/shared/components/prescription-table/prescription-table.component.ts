import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-prescription-table',
  templateUrl: './prescription-table.component.html',
  styleUrls: ['./prescription-table.component.scss'],
})
export class PrescriptionTableComponent {
  isPrintEnabled: boolean = true;
  @Output() prescriptionUpdated = new EventEmitter<any[]>();

  isRecording: boolean = false;
  recognition: any;
  idleTimeout: any;

  tableHeaders: string[] = [
    'Types',
    'Medicine',
    'Content',
    'सकाळ',
    'दुपार',
    'रात्र',
    'कधी घ्यायचा',
    'किती दिवस',
    'Qty',
  ];

  medicineTypes: any[] = [];
  intakeTimes: any[] = [];
  sel:any
  medicineHistory = [
    // {
    //   medicine: 'Zerodol P',
    //   morning: 1,
    //   afternoon: 0,
    //   night: 1,
    //   intakeTime: 'जेवणानंतर',
    //   days: 5,
    //   quantity: 10,
    // },
    // {
    //   medicine: 'Crocin',
    //   morning: 1,
    //   afternoon: 0,
    //   night: 1,
    //   intakeTime: 'जेवणानंतर',
    //   days: 5,
    //   quantity: 10,
    // },
    // {
    //   medicine: 'Zincovit',
    //   morning: 1,
    //   afternoon: 1,
    //   night: 0,
    //   intakeTime: 'जेवणानंतर',
    //   days: 7,
    //   quantity: 14,
    // },
  ];
  selectedPrescripitionFillData:any
  @Input() prescriptionData = [];
  showVoiceInput = true
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.medicineHistory = JSON.parse(localStorage.getItem('prescriptionData'));
    this.medicineTypes = JSON.parse(localStorage.getItem('medicineTypes'));
    this.intakeTimes = JSON.parse(localStorage.getItem('medicinePeriods'));
    this.addRow()
  }

  addRow() {
    this.prescriptionData.push({
      type: '',
      medicine: '',
      content:'',
      morning: '',
      afternoon: '',
      night: '',
      intakeTime: '',
      days: '',
      quantity: '',
      filteredMedicines: [],
    });
    this.emitPrescriptionData();
  }

  

  selectedMedicineType(type){
    this.sel = type

    console.log(this.sel)
    let data = this.intakeTimes.filter((data)=> data.medicineType === type)
    this.selectedPrescripitionFillData = data
    console.log(data)
  }

  autoCalculateQuantity(row: any) {
    const morning = Number(row.morning) || 0;
    const afternoon = Number(row.afternoon) || 0;
    const night = Number(row.night) || 0;
    const days = Number(row.days) || 0;

    const calculated = (morning + afternoon + night) * days;

    // Only update quantity if user hasn't manually overridden it
    if (!row.userModifiedQuantity || row.quantity === 0) {
      row.quantity = calculated;
    }

    this.emitPrescriptionData();
  }
  searchTerm:any
  toggleVoiceInput(): void {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support voice input.');
      return;
    }

    this.recognition = new (window as any).webkitSpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = true; // Enable real-time updates
    this.recognition.maxAlternatives = 1;

    // Start Recording
    this.recognition.onstart = () => {
      this.isRecording = true;
      console.log('Recording started');
    };

    // Handle Real-Time Results
    this.recognition.onresult = (event: any) => {
      const spokenText = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join(' ');
      this.searchTerm = spokenText;
      console.log('Recognized Text:', spokenText);

      // Reset the idle timeout when receiving results
      clearTimeout(this.idleTimeout);
      this.idleTimeout = setTimeout(() => {
        this.stopVoiceInput();
        console.log('Recording stopped automatically due to inactivity.');
      }, 1500); // Stop recording after 1.5 seconds of silence
    };

    // Handle Errors
    this.recognition.onerror = (event: any) => {
      console.error('Speech Recognition Error:', event.error);
      this.stopVoiceInput();
    };

    // Stop Recording
    this.recognition.onend = () => {
      this.stopVoiceInput();
      console.log('Recording ended');
    };

    // Start voice recognition
    this.recognition.start();
  }

  stopVoiceInput(): void {
    if (this.recognition) {
      this.recognition.stop();
      this.isRecording = false;
      console.log('Recording stopped');

      // Simulate Enter key press to save data
      // Use a more specific selector by dropdown ID to target the correct input field
      this.cdr.detectChanges(); // Force Angular to update the view
    }
    clearTimeout(this.idleTimeout);
  }

  removeRow(index: number) {
    this.prescriptionData.splice(index, 1);
    this.emitPrescriptionData();
  }

  filterMedicineSuggestions(row: any) {
    const search = row.medicine.toLowerCase();
    if (search) {
      row.filteredMedicines = this.medicineHistory?.filter((med) =>
        med.medicine.toLowerCase().startsWith(search)
      );
    } else {
      row.filteredMedicines = [];
    }
  }

  selectMedicine(row: any, selectedMedicine: any) {
    row.medicine = selectedMedicine.medicine;
    row.content = selectedMedicine.content
    row.morning = selectedMedicine.morning;
    row.afternoon = selectedMedicine.afternoon;
    row.night = selectedMedicine.night;
    row.intakeTime = selectedMedicine.intakeTime;
    row.days = selectedMedicine.days;
    row.quantity = selectedMedicine.quantity;
    row.filteredMedicines = [];
    this.emitPrescriptionData();
  }

  emitPrescriptionData() {
    localStorage.setItem(
      'prescriptionData',
      JSON.stringify(this.prescriptionData)
    );
    this.prescriptionUpdated.emit(this.prescriptionData);
  }
}
