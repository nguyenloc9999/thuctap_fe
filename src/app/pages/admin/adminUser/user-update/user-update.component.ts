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
    // password: ['', [Validators.required, Validators.minLength(6)]]
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
  selectedImage: any = null; // Biến lưu trữ ảnh được chọn
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

        // Tải lên ảnh mới và nhận URL đã tải lên

        this.uploadService.updateImage(publicId, this.selectedImage).subscribe(
          (response) => {

            const imageUrl = response
            console.log(imageUrl);

            if (imageUrl) {
              newUser.image = imageUrl;

              // Gọi productService.updateProduct() để cập nhật thông tin sản phẩm
              this.userService.updateUser(newUser).subscribe(
                (userUpdate) => {
                  // Xử lý khi sản phẩm được cập nhật thành công
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'User has been updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.router.navigate(['/admin/user']);
                },
                (error) => {
                  // Xử lý khi có lỗi trong quá trình cập nhật sản phẩm
                  console.log(error.message);
                }
              );
            } else {
              // Xử lý khi không có URL mới để cập nhật
              console.log('Không có URL mới để cập nhật');
            }
          },
          (error) => {
            // Xử lý khi có lỗi trong quá trình upload ảnh
            console.log(error.message);
          }
        );
      } else {
        // Người dùng không chọn ảnh mới, chỉ cập nhật thông tin sản phẩm
        this.userService.updateUser(newUser).subscribe(
          (userUpdate) => {
            // Xử lý khi sản phẩm được cập nhật thành công
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'User has been updated successfully!',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/admin/user']);
          },
          (error) => {
            // Xử lý khi có lỗi trong quá trình cập nhật sản phẩm
            console.log(error.message);
          }
        );
      }
    }

  }
}
