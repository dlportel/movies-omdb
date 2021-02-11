import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {IItemFullOmdb} from '../../../../core/models/omdb-item.model';

@Component({
  selector: 'app-modal-item-details',
  templateUrl: './modal-item-details.component.html',
  styleUrls: ['./modal-item-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalItemDetailsComponent implements OnInit {
  public info: string[][] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public itemData: IItemFullOmdb) {
  }

  ngOnInit(): void {
    for (const key in this.itemData) {
      if (key !== 'Title' && key !== 'Poster') {
        this.info.push([key, this.itemData[key]]);
      }
    }

  }
}
