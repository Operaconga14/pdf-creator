import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import html2pdf from 'html2pdf.js'

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pdf-creator',
  standalone: true,
  imports: [FormsModule, EditorModule],
  templateUrl: './pdf-creator.component.html',
  styleUrl: './pdf-creator.component.scss'
})
export class PdfCreatorComponent {


  pdfText: string = ''
  apikey = environment.apiKey



  createPDF(): void {
    // Create a temporary div to hold the HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = this.pdfText;
    // tempDiv.style.position = 'absolute';
    // tempDiv.style.top = '-9999px !important'; // Move off-screen
    document.body.appendChild(tempDiv);

    // Convert the div content to PDF
    const options = {
      margin: 1,
      filename: 'created.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(tempDiv).set(options).save();

    // Clean up
    document.body.removeChild(tempDiv);
  }
}
