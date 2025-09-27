import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product-modal',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
})
export class AddProductModalComponent implements OnInit {
  @Input() product: any = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
  };

  isEdit = false;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.product && this.product.id) {
      this.isEdit = true;
    }
  }

  close() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  save() {
    this.modalCtrl.dismiss(this.product, this.isEdit ? 'update' : 'save');
  }
}
