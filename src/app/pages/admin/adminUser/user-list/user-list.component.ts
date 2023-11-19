import { Component } from '@angular/core';
import { IUser } from 'src/app/interface/user';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: IUser[] = [];
  constructor(private UserService: UserService) {
    this.UserService.getUser().subscribe((data) => {
      this.users = data
    }, error => {
      console.log(error.message);

    })
  }
  removeItem(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Xóa danh mục
        this.UserService.removeUser(id).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Xóa người dùng thành công.',
            'success'
          )
          const newUser = this.users.filter((user) => user._id != id);
          this.users = newUser
        }, error => {
          console.log(error.message);
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
        Swal.fire(
          'Cancelled',
          'Xóa người dùng thất bại',
          'error'
        )
      }
    })
  }
}
