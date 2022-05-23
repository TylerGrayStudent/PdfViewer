import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgxExtendedPdfViewerComponent } from 'ngx-extended-pdf-viewer';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('pdfViewer') pdfViewer: NgxExtendedPdfViewerComponent | undefined;
  @ViewChild('file') file: any;
  constructor(private http: HttpClient) {}
  print() {
    console.log(this.pdfViewer?.formData);
    console.log(this.pdfViewer);
  }
  onSrcChange(event: any) {
    console.log(event);
  }

  async upload() {
    const blob = await firstValueFrom(
      this.http.get('assets/emptyfed.pdf', { responseType: 'blob' })
    );
    const base64 = await this.blobToBase64(blob);
    this.http
      .post('http://localhost:5066/api/pdf', {
        file: base64,
        content: JSON.stringify(this.pdfViewer?.formData),
      })
      .subscribe((res) => {
        this.downloadBase64File(res, 'test.pdf');
      });
  }

  // const file = this.file.nativeElement.files[0];
  // this.toBase64(file).then((base64) => {
  //   this.http
  //     .post('http://localhost:5066/api/pdf', {
  //       file: base64,
  //       content: JSON.stringify(this.pdfViewer.formData),
  //     })
  //     .subscribe((res) => {
  //       //console.log(res);
  //       this.downloadBase64File(res, 'test.pdf');
  //     });
  // });

  toBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  downloadBase64File(contentBase64: any, fileName: string) {
    const linkSource = `data:application/pdf;base64,${contentBase64}`;
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = linkSource;
    downloadLink.target = '_self';
    downloadLink.download = fileName;
    downloadLink.click();
  }
}
