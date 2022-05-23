import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BasicPoint } from './model/point';
import SignaturePad from './model/SignaturePad';

export interface PointGroup {
  color: string;
  points: BasicPoint[];
}

@Component({
  selector: 'hq-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css'],
})
export class SignatureComponent implements AfterViewInit, OnChanges {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> | undefined;
  @Input() enabled = true;
  private _signaturePad: SignaturePad | undefined;
  public value = new BehaviorSubject<string>('');

  ngAfterViewInit(): void {
    if (this.canvas) {
      this._signaturePad = new SignaturePad(this.canvas.nativeElement, {
        backgroundColor: 'rgb(255,255,255)',
        penColor: 'rgb(0,0,0)',
      });
      // image/jpeg for jpeg image/svg+xml for svg Note: PDF Sharp doesnt support svg
      this.value.next(this._signaturePad.toDataURL('image/jpeg'));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.enabled) {
    //   if (!this._signaturePad) return;
    //   this._signaturePad.clear();
    //   if (changes.enabled.currentValue) {
    //     this._signaturePad.on();
    //   } else {
    //     this._signaturePad.off();
    //   }
    // }
  }

  onClearClick(): void {
    this._signaturePad?.clear();
    this.value?.next('');
  }

  empty(): boolean {
    if (this._signaturePad) {
      return this._signaturePad.isEmpty();
    }
    return true;
  }

  emitData(): void {
    const data = this._signaturePad?.toDataURL('image/jpeg');
    this.value?.next(data ?? '');
  }
}
