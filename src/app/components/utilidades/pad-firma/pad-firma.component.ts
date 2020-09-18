import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import SignaturePad, { IPointGroup } from 'signature_pad';
import { PostService } from '../../../services/post.service';
import { GetService } from '../../../services/get.service';

@Component({
  selector: 'app-pad-firma',
  templateUrl: './pad-firma.component.html',
  styleUrls: [],
})
export class PadFirmaComponent implements OnInit, AfterViewInit {
  @ViewChild('sPad', { static: true }) firmaPadElement: ElementRef<
    HTMLCanvasElement
  >;
  firmaPad: SignaturePad;
  edit: boolean;
  constructor(
    private postService: PostService,
    private getService: GetService
  ) {}

  ngAfterViewInit(): void {
    this.firmaPad = new SignaturePad(this.firmaPadElement.nativeElement, {});
  }

  ngOnInit(): void {
    this.getService
      .getFirma(localStorage.getItem('version_core'))
      .subscribe((data) => {
        if (data.ErrorCode === 0 && data.Firma !== null) {
          this.edit = true;
          console.log(data);
        }
      });
  }

  cerrarPopup(): void {
    document.querySelector('#overlay-firma').classList.remove('active');
  }

  abrirFirma(): void {
    this.borrar();
    document.querySelector('#overlay-firma').classList.add('active');
  }

  borrar(): void {
    this.firmaPad.clear();
  }

  undo(): void {
    const data = this.firmaPad.toData();
    if (data) {
      // borra la ultima linea o punto
      data.pop();
      this.firmaPad.fromData(data);
    }
  }

  /*private download(dataURL, filename): void {
    if (
      navigator.userAgent.indexOf('Safari') > -1 &&
      navigator.userAgent.indexOf('Chrome') === -1
    ) {
      window.open(dataURL);
    } else {
      const blob = this.dataURLToBlob(dataURL);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.href = dataURL;
      a.download = filename;

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
    }
  }*/

  /*private dataURLToBlob(dataURL): Blob {
    // Code taken from https://github.com/ebidel/filer.js
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }*/

  guardar(): void {
    if (this.firmaPad.isEmpty()) {
      alert('Debe realizar una firma antes de poder guardarla');
    } else {
      const firma = {
        IdPersona: localStorage.getItem('version_core'),
        firma: JSON.stringify(this.firmaPad.toData()),
      };
      this.postService.PostFirma(firma).subscribe((data) => {
        console.log(data);
        if (data.ErrorCode === 0) {
          this.edit = true;
          this.borrar();
          this.cerrarPopup();
        }
      });
    }
  }

  editar(): void {
    this.getService
      .getFirma(localStorage.getItem('version_core'))
      .subscribe((data) => {
        let puntos: Array<IPointGroup> = [];
        puntos = JSON.parse(data.Firma);
        this.abrirFirma();
        this.firmaPad.fromData(puntos);
      });
  }
}
