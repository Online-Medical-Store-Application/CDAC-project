import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Checkout() {
  const cart = useSelector((state) => state.cart);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    // get the total amount
    let total = 0;
    for (const item of cart.items) {
      total += item.rent;
    }
    setTotal(total);
  }, []);

  return (
    <div>
      <div>
        <header>
          <Link to="/home">
            <h2>Medico</h2>
          </Link>
          <nav>
            <ul>
              <li>
                <Link to="/login">Logout</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <select id="filter" name="filter">
                  <option value="" selected>
                    select
                  </option>
                  <option value="Featured">Featured</option>
                  <option value="Price Low to High">Price Low to High</option>
                  <option value="Price High to Low">Price High to Low</option>
                </select>
              </li>
              <li>
                <Link to="/manageProfiles">User</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <section class="order-summary">
            <h2>Order Summary</h2>
            <table id="order-items">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Product 1</td>
                  <td>$10.00</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>Product 2</td>
                  <td>$20.00</td>
                  <td>2</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2">Subtotal</td>
                  <td id="subtotal">$30.00</td>
                </tr>
                <tr>
                  <td colspan="2">Shipping</td>
                  <td id="shipping">$5.00</td>
                </tr>
                <tr>
                  <td colspan="2">
                    <b>Total</b>
                  </td>
                  <td id="total-price">$35.00</td>
                </tr>
              </tfoot>
            </table>
          </section>

          <section class="payment-information">
            <h2>Payment Information</h2>
            <form action="#">
              <label for="name">Name on Card:</label>
              <input type="text" id="name" required />

              <label for="card-number">Card Number:</label>
              <input type="number" id="card-number" required />

              <label for="expiration-date">Expiration Date:</label>
              <input type="date" id="expiration-date" required />

              <label for="cvv">CVV:</label>
              <input type="number" id="cvv" required />

              <button type="submit">Place Order</button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Checkout;
