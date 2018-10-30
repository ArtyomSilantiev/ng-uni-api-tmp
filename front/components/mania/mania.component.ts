import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-mania',
  templateUrl: './mania.component.html',
  styleUrls: ['./mania.component.scss']
})

export class ManiaComponent implements OnInit {
  private bablo: number;

  constructor() {
  }

  ngOnInit(): void {
    this.bablo = Number(localStorage.getItem('mania.bablo')) || 0;
  }

  private moreBablo(): void {
    this.bablo += 10;
    localStorage.setItem('mania.bablo', String(this.bablo));
  }
}
