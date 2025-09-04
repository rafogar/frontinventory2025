import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {
    estadoFormulario: string = "";
    public categoryForm!: FormGroup;
    private fb = inject(FormBuilder);
    private categoryService = inject(CategoryService);
    private dialogRef = inject(MatDialogRef);
    public data = inject(MAT_DIALOG_DATA);

    ngOnInit(): void {
      this.estadoFormulario = "Agregar";
      this.categoryForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required]
      });

      if(this.data != null){
        this.updateForm(this.data);
        this.estadoFormulario = "Actualizar";
      }
    }

     onSave(){
        let data = {
          name: this.categoryForm.get('name')?.value,
          description: this.categoryForm.get('description')?.value
        }

        if( this.data != null){
          //update registry
          this.categoryService.updateCategory(data, this.data.id)
          .subscribe((data : any) => {
            this.dialogRef.close(1);
          }, (error:any) => {
            this.dialogRef.close(2);
          })
        } else {
          this.categoryService.saveCategory(data)
        .subscribe((data : any) => {
            console.log(data);
            this.dialogRef.close(1);
          }, (error:any) => {
            this.dialogRef.close(2);
          })
        }



      }

      onCancel(){
        this.dialogRef.close(3);
      }

      updateForm(data: any){
        this.categoryForm = this.fb.group({
          name: [data.name, Validators.required],
          description: [data.description, Validators.required]
        });

      }
}
