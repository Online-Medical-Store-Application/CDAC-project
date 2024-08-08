import { Link, useParams } from "react-router-dom";
import { getProductDetails } from "../services/product";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import config from "../config";
import medicine from "../medicine.jpg";

function ManageProfiles() {
  // const { propertyId } = useParams();
  // const [details, setDetails] = useState(undefined);

  // const loadProductDetails = async () => {
  //   const result = await getProductDetails(propertyId);
  //   if (result["status"] === "success") {
  //     const details = result["data"];

  //     setDetails(result["data"]);
  //     console.log(result["data"]);
  //   } else {
  //     toast.error(result["error"]);
  //   }
  // };

  // useEffect(() => {
  //   loadProductDetails();
  // }, []);

  return (
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
          </ul>
        </nav>
      </header>
      <div class="profile-window">
        <div class="profile-header">
          <h2>Medico User Full Name</h2>
          <h3>Profile window</h3>
        </div>
        <div class="profile-body">
          <h4>Manage your profiles</h4>
          <div class="profile-details">
            <p>User Full Name</p>
            <ul>
              <li>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" value="User Full Name" />
              </li>
              <li>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value="user@email.com" />
              </li>
              <li>
                <label for="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" value="01234567890" />
              </li>
              <li>
                <label for="address">Address:</label>
                <input type="text" id="address" name="address" value="123 Main Street" />
              </li>
              <li>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" value="********" />
              </li>
            </ul>
          </div>
          <div class="profile-actions">
            <button class="delete-btn">Delete account</button>
            <button class="close-btn">Close</button>
            <button class="save-btn">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageProfiles;
