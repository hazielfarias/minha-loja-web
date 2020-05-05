import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-upload-product',
  templateUrl: './upload-product.component.html',
  styleUrls: ['./upload-product.component.scss']
})
export class UploadProductComponent implements OnInit {
  fileList: Array<string> = new Array<string>();
  file1: FileList = null;
  file2: FileList = null;
  file3: FileList = null;
  produto: Product = new Product();

  titleFormControl = new FormControl('', [
    Validators.required
  ]);
  priceFormControl = new FormControl('', [
    Validators.required
  ]);
  stockFormControl = new FormControl('', [
    Validators.required
  ]);
  descriptionFormControl = new FormControl('', []);

  public productForm = new FormGroup({
    title: this.titleFormControl,
    description: this.descriptionFormControl,
    price: this.priceFormControl,
    stock: this.stockFormControl
  });

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
  }

  detectFile1(event) {
    console.log(event);

    this.file1 = event.target.files;
  }
  detectFile2(event) {
    this.file2 = event.target.files;
  }
  detectFile3(event) {
    this.file3 = event.target.files;
  }

  onSubmit() {

    this.produto.title = this.titleFormControl.value;
    this.produto.price = this.priceFormControl.value;
    this.produto.stock = this.stockFormControl.value;
    this.produto.description = this.descriptionFormControl.value;

    this.uploadService.insertProduct(this.produto);


    /*
        if (this.file1 !== null) {
          this.uploadService.upload(this.file1.item(0));
        }
        if (this.file2 !== null) {
          this.uploadService.upload(this.file2.item(0));
        }
        if (this.file3 !== null) {
          this.uploadService.upload(this.file3.item(0));
        }*/
  }

}
