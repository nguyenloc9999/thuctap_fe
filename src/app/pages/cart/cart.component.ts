import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Icart } from 'src/app/interface/cart';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements AfterViewInit {
  cart !: Icart
  quantity: number = 1;

  constructor(
    private CartService: CartService,
    private UserService: UserService,
    private router: Router
  ) {
    console.log(this.userId);

  }

  userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).user._id : ''
  //------------------------------------
  handleRemoveProductInCart(productId: string) {
    this.CartService.removeProductInCart(this.userId, productId).subscribe(() => {
      const newCart = this.cart.data.products.filter((ca: any) => ca.productId != productId);
      this.cart.data.products = newCart
    })

  }
  // -----------------------------------
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  increaseQuantity() {
    this.quantity++;
  }
  ngAfterViewInit() {
    if (this.userId === '') return
    this.CartService.getCart(this.userId).subscribe(cart => {
      this.cart = cart
    })
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).accessToken : ''
    console.log(token);

    if (!token) {
      this.router.navigate(['/signin'])
      return
    }
    // ------------------------------------

    var check = false;

    function changeVal(el: any) {
      var qt = parseFloat(el.parent().children(".qt").html());
      var price = parseFloat(el.parent().children(".price").html());
      var eq = Math.round(price * qt * 100) / 100;

      el.parent().children(".full-price").html(eq + "Đ");

      changeTotal();
    }

    function changeTotal() {

      var price = 0;

      $(".full-price").each(function (index) {
        price += parseFloat($(".full-price").eq(index).html());
      });

      price = Math.round(price * 100) / 100;
      var tax = Math.round(price * 0.05 * 100) / 100
      var shipping = parseFloat($(".shipping span").html());
      var fullPrice = Math.round((price + tax + shipping) * 100) / 100;

      if (price == 0) {
        fullPrice = 0;
      }

      $(".subtotal span").html(String(price));
      $(".tax span").html(String(tax));
      $(".total span").html(String(fullPrice));
    }

    $(document).ready(function () {

      $(".remove").click(function () {
        var el = $(this);
        el.parent().parent().addClass("removed");
        window.setTimeout(
          function () {
            el.parent().parent().slideUp('fast', function () {
              el.parent().parent().remove();
              if ($(".product").length == 0) {
                if (check) {
                  $("#cart").html("<h1>The shop does not function, yet!</h1><p>If you liked my shopping cart, please take a second and heart this  on . Thank you!</p>");
                } else {
                  $("#cart").html("<h1>No products!</h1>");
                }
              }
              changeTotal();
            });
          }, 200);
      });

      $(".qt-plus").click(function () {
        $(this).parent().children(".qt").html(String(parseInt($(this).parent().children(".qt").html()) + 1));

        $(this).parent().children(".full-price").addClass("added");

        var el = $(this);
        window.setTimeout(function () { el.parent().children(".full-price").removeClass("added"); changeVal(el); }, 150);
      });

      $(".qt-minus").click(function () {

        const child = $(this).parent().children(".qt");

        if (parseInt(child.html()) > 1) {
          child.html(String(parseInt(child.html()) - 1));
        }

        $(this).parent().children(".full-price").addClass("minused");

        var el = $(this);
        window.setTimeout(function () { el.parent().children(".full-price").removeClass("minused"); changeVal(el); }, 150);
      });

      window.setTimeout(function () { $(".is-open").removeClass("is-open") }, 1200);

      $(".btn").click(function () {
        check = true;
        $(".remove").click();
      });
    });
  }
}
