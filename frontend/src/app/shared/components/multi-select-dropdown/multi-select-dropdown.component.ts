import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { DropdownStateService } from 'src/app/core/services';

interface OptionsFormat {
  name: string;
  value: string;
  dropdownId: any;
  key:string
}

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.scss'],
})
export class MultiSelectDropdownComponent implements OnInit {
  @Input() options: OptionsFormat[] = [];
  @Input() label: string = '';
  @Input() key:string=''
  @Input() isSuperAdmin: boolean = false; // Flag to indicate if the component is used in Super Admin
  @Input() initialSelections: OptionsFormat[] = [];
  @Input() dropdownId: string = ''; // Unique ID for each dropdown
  @Input() showCheckBox: boolean = false; // Show checkbox for each option
  @Input() showVoiceInput: boolean = false; // Show voice input button
  @Output() selectionChanged = new EventEmitter(); // Emit selected options to parent
  selectedOptions: OptionsFormat[] = [];
  filteredOptions: OptionsFormat[] = [];
  searchTerm: string = '';
  dropdownOpen: boolean = false;
  allData = [];
  isPrintEnabled: boolean = true; // Default ON

  constructor(
    private dropdownStateService: DropdownStateService,
    private eRef: ElementRef,
    private cdr: ChangeDetectorRef // Add this
  ) {}

  // Update ngOnInit to handle initial selections
// In multi-select-dropdown.component.ts
ngOnInit() {
  this.dropdownStateService.setActiveDropdown(null);
  this.filteredOptions = [...this.options]
  // Set initial selections if provided
  if (this.initialSelections && this.initialSelections.length) {
    // Filter out any initial selections that don't exist in current options
    this.selectedOptions = this.initialSelections.filter(initialOption => 
      this.options.some(option => option.name === initialOption.name)
    );
    
    // Add any initial selections that aren't in current options
    const missingOptions = this.initialSelections.filter(initialOption => 
      !this.options.some(option => option.name === initialOption.name)
    );
    
    if (missingOptions.length) {
      this.options = [...this.options, ...missingOptions];
      this.selectedOptions = [...this.selectedOptions, ...missingOptions];
    }
    
    this.emitSelectionChanged();
  }
  
  if (!this.options || this.options.length === 0) {
    this.emitSelectionChanged();
  }
}

// In multi-select-dropdown.component.ts
ngOnChanges(changes: SimpleChanges) {
  if (changes['initialSelections'] && changes['initialSelections'].currentValue) {
    this.updateSelectedOptions(changes['initialSelections'].currentValue);
  }
}

private updateSelectedOptions(newSelections: OptionsFormat[]) {
  // Clear current selections
  this.selectedOptions = [];
  
  // Add new selections
  newSelections.forEach(selection => {
    // Find the matching option in available options
    const matchingOption = this.options.find(option => 
      option.name === selection.name || option.value === selection.value
    );
    
    if (matchingOption) {
      this.selectedOptions.push(matchingOption);
    } else {
      // If option doesn't exist, add it as a custom option
      this.selectedOptions.push(selection);
      this.options = [...this.options, selection];
    }
  });
  
  this.filteredOptions = [...this.options];
  this.emitSelectionChanged();
}
  isRecording: boolean = false;
  recognition: any;
  idleTimeout: any;

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
      this.filterOptions();
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
      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13, // Key code for Enter
        bubbles: true,
      });

      // Use a more specific selector by dropdown ID to target the correct input field
      const inputElement = document.querySelector(
        `.dropdown-input[data-dropdown-id="${this.dropdownId}"]`
      );
      if (inputElement) {
        inputElement.dispatchEvent(event);
      }

      this.filterOptions(); // Update options after final stop
      this.cdr.detectChanges(); // Force Angular to update the view
    }
    clearTimeout(this.idleTimeout);
  }

  toggleDropdown(open: boolean) {
    if (open) {
      this.dropdownStateService.setActiveDropdown(this.dropdownId);
      this.dropdownOpen = true;
    } else {
      this.dropdownOpen = false;
      this.dropdownStateService.setActiveDropdown(null);
    }
    this.filterOptions();
  }

  printPage() {
    if (this.isPrintEnabled) {
      window.print();
    } else {
      console.log('Print Disabled for this Dropdown');
    }
  }

  filterOptions() {
    if (!Array.isArray(this.options)) {
      this.options = [];
    }

    this.filteredOptions = this.options.filter((option) =>
      option.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  isSelected(option: OptionsFormat): boolean {
    return this.selectedOptions.some((item) => item.name === option.name);
  }

  toggleSelection(option: OptionsFormat) {
    console.log(option);
    const index = this.selectedOptions.findIndex(
      (item) => item.name === option.name
    );
    if (index !== -1) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(option);
    }
    this.emitSelectionChanged(); // Emit data on every change
  }
  emitSelectionChanged() {
    // Create the new entry
    const newEntry = {
      key: this.key,
      options: [...this.selectedOptions], // Clone to avoid reference issues
      isPrintEnabled: this.isPrintEnabled, // Include toggle switch value
    };
    console.log('newEntry', newEntry);
    // Find existing index
    console.log("allData",this.allData)
    const existingIndex = this.allData?.findIndex(
      (item) => item.key === this.key
    );

    // Update or add
    if (this.selectedOptions.length > 0) {
      if (existingIndex !== -1) {
        this.allData[existingIndex] = newEntry;
      } else {
        this.allData.push(newEntry);
      }
    } else {
      // Remove if no selections
      if (existingIndex !== -1) {
        this.allData.splice(existingIndex, 1);
      }
    }
    // Emit a deep copy to prevent external modifications
    this.selectionChanged.emit(JSON.parse(JSON.stringify(this.allData)));
  }

  removeItem(item: OptionsFormat) {
    this.selectedOptions = this.selectedOptions.filter(
      (option) => option.name !== item.name
    );
    this.emitSelectionChanged(); // Emit data on item removal
  }

  addNewOption() {
    if (
      this.searchTerm &&
      !this.options?.some((option) => option.name === this.searchTerm)
    ) {
      const newOption: OptionsFormat = {
        name: this.searchTerm,
        value: 'custom',
        dropdownId: this.dropdownId,
        key:this.key
      };
      this.options = [...this.options, newOption]; // Create a new array reference to trigger change detection
      this.selectedOptions.push(newOption);
      this.searchTerm = '';
      this.filterOptions();
      this.emitSelectionChanged(); // Emit data on adding a new option
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target) && this.dropdownOpen) {
      this.toggleDropdown(false);
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
    this.toggleDropdown(false);
  }
}
