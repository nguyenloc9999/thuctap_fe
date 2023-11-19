import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/interface/user';
import { UserService } from 'src/app/services/user/user.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import Swal from 'sweetalert2';
import { UploadService } from 'src/app/services/upload/upload.service';
export function customEmailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const valid = emailPattern.test(control.value);
    return valid ? null : { invalidEmail: { message: 'Email không hợp lệ.' } };
  };
}

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  submitted = false;
  user!: IUser;

  userForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email, customEmailValidator()]],
    address: ['', [Validators.required, Validators.minLength(6)]],
    role: [''],
    image: ['']
    
  })

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private uploadService: UploadService

  ) {
    this.route.paramMap.subscribe(params => {
      const id = String(params.get('id'));
      this.userService.getUserById(id).subscribe(user => {
        this.user = user;
        this.userForm.patchValue({
          name: this.user.name,
          email: this.user.email,
          address: this.user.address,
          role: this.user.role,
        })
      }, error => console.log(error.message)
      )
    })
  }
  selectedImage: any = null; 
  onSelectImage(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
      this.userForm.patchValue({ image: this.selectedImage });
    } else {
      this.selectedImage = null;
      this.userForm.patchValue({ image: null });
    }
  }
  onHandleUpdate() {
    if (this.userForm.valid) {
      const newUser: IUser = {
        _id: this.user._id,
        name: this.userForm.value.name || "",
        email: this.userForm.value.email || "",
        address: this.userForm.value.address || "",
        role: this.userForm.value.role || "",
        image: this.user.image,
      }
      if (this.selectedImage) {
        const publicId = this.user.image.publicId;
        console.log(publicId);

       

        this.uploadService.updateImage(publicId, this.selectedImage).subscribe(
          (response) => {

            const imageUrl = response
            console.log(imageUrl);

            if (imageUrl) {
              newUser.image = imageUrl;

             
              this.userService.updateUser(newUser).subscribe(
                (userUpdate) => {
                  
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cập nhật người dùng thành công!',
                    showConfirmButton: false,
                    timer: 1000
                  });
                  this.router.navigate(['/admin/user']);
                },
                (error) => {
                  
                  console.log(error.message);
                }
              );
            } else {
              
              console.log('Không có URL mới để cập nhật');
            }
          },
          (error) => {
            
            console.log(error.message);
          }
        );
      } else {
        
        this.userService.updateUser(newUser).subscribe(
          (userUpdate) => {
            
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Cập nhật người dùng thành công!',
              showConfirmButton: false,
              timer: 1000
            });
            this.router.navigate(['/admin/user']);
          },
          (error) => {
            
            console.log(error.message);
          }
        );
      }
    }

  }
}
