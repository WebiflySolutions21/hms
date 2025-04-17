import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-draw-write-modal',
  templateUrl: './draw-write-modal.component.html',
  styleUrls: ['./draw-write-modal.component.scss'],
})
export class DrawWriteModalComponent implements OnInit {
  @Input() patientId: string = '';
  private canvas!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;
  private drawing = false;
  private startX = 0;
  private startY = 0;
  private undoStack: string[] = [];
  private redoStack: string[] = [];

  selectedTool: string = 'pencil';
  selectedColor: string = '#000000';
  lineWidth: number = 3;
  isBold: boolean = false;

  ngOnInit(): void {
    this.initializeCanvas();
  }

  initializeCanvas(): void {
    this.canvas = document.getElementById('drawingCanvas') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
    this.canvas.addEventListener('mousemove', (e) => this.draw(e));
    this.canvas.addEventListener('mouseup', (e) => this.stopDrawing(e));
    this.canvas.addEventListener('mouseleave', (e) => this.stopDrawing(e));

    this.loadDrawing();
  }

  startDrawing(event: MouseEvent): void {
    this.saveState(); // Save for Undo
    this.drawing = true;
    this.startX = event.offsetX;
    this.startY = event.offsetY;

    if (this.selectedTool === 'pencil' || this.selectedTool === 'eraser') {
      this.context.beginPath();
      this.context.moveTo(this.startX, this.startY);
    }
  }

  draw(event: MouseEvent): void {
    if (!this.drawing) return;
    const { offsetX, offsetY } = event;

    if (this.selectedTool === 'pencil') {
      this.context.strokeStyle = this.selectedColor;
      this.context.lineWidth = this.lineWidth;
      this.context.lineTo(offsetX, offsetY);
      this.context.stroke();
    }

    if (this.selectedTool === 'eraser') {
      this.context.strokeStyle = '#FFFFFF';
      this.context.lineWidth = this.lineWidth + 10;
      this.context.lineTo(offsetX, offsetY);
      this.context.stroke();
    }
  }

  stopDrawing(event?: MouseEvent): void {
    if (!this.drawing) return;
  
    if (this.selectedTool === 'rectangle' && event) {
      const width = event.offsetX - this.startX;
      const height = event.offsetY - this.startY;
      this.context.strokeStyle = this.selectedColor;
      this.context.lineWidth = this.lineWidth;
      this.context.strokeRect(this.startX, this.startY, width, height);
    }
  
    if (this.selectedTool === 'circle' && event) {
      const radius = Math.sqrt(
        Math.pow(event.offsetX - this.startX, 2) + Math.pow(event.offsetY - this.startY, 2)
      );
      this.context.beginPath();
      this.context.arc(this.startX, this.startY, radius, 0, Math.PI * 2);
      this.context.strokeStyle = this.selectedColor;
      this.context.lineWidth = this.lineWidth;
      this.context.stroke();
    }
  
    if (this.selectedTool === 'text' && event) {
      const text = prompt('Enter text:');
      if (text) {
        this.context.fillStyle = this.selectedColor;
        this.context.font = `${this.isBold ? 'bold' : ''} 20px Arial`;
        this.context.fillText(text, event.offsetX, event.offsetY);
      }
    }
  
    this.drawing = false;
    this.context.closePath();
  }
  

  toggleBold(): void {
    this.isBold = !this.isBold;
  }

  undo(): void {
    if (this.undoStack.length === 0) return;
    this.redoStack.push(this.canvas.toDataURL());
    const image = new Image();
    image.onload = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(image, 0, 0);
    };
    image.src = this.undoStack.pop()!;
  }

  redo(): void {
    if (this.redoStack.length === 0) return;
    this.saveState(); // Push current state to undo stack before redo
    const image = new Image();
    image.onload = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(image, 0, 0);
    };
    image.src = this.redoStack.pop()!;
  }

  saveState(): void {
    this.undoStack.push(this.canvas.toDataURL());
    this.redoStack = [];  // Clear redo stack on new action
  }

  saveDrawing(): void {
    const imageData = this.canvas.toDataURL();
    localStorage.setItem(`drawing_${this.patientId}`, imageData);
    alert('Drawing saved successfully!');
  }

  loadDrawing(): void {
    const savedData = localStorage.getItem(`drawing_${this.patientId}`);
    if (savedData) {
      const image = new Image();
      image.onload = () => this.context.drawImage(image, 0, 0);
      image.src = savedData;
    }
  }
}
