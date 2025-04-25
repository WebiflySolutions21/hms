import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  printElement(elementId: string) {
    const content = document.getElementById(elementId);
    if (!content) return;

    const printWindow = window.open('', '_blank');
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(node => node.outerHTML)
      .join('\n');

    printWindow!.document.write(`
      <html>
        <head>
          <title>Print</title>
          ${styles}
        </head>
        <body onload="window.print(); window.close();">
          ${content.innerHTML}
        </body>
      </html>
    `);
    printWindow!.document.close();
  }
}
