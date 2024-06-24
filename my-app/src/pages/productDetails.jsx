import { Link, useParams } from "react-router-dom";
import { getProductDetails } from "../services/product";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import config from "../config";

function ProductDetails() {
  const { propertyId } = useParams();
  const [details, setDetails] = useState(undefined);

  // collect all the amenities
  const [amenities, setAmenities] = useState([]);

  const loadProductDetails = async () => {
    const result = await getProductDetails(propertyId);
    if (result["status"] === "success") {
      const details = result["data"];

      // clear the array
      amenities.splice(0, amenities.length);

      amenities.push({
        icon: "droplet",
        title: "Lake nearby",
        status: details.isLakeView,
      });
      amenities.push({
        icon: "tv",
        title: "TV available",
        status: details.isTV,
      });
      amenities.push({
        icon: "fan",
        title: "AC Available",
        status: details.isAC,
      });
      amenities.push({
        icon: "wifi",
        title: "WiFi Available",
        status: details.isWifi,
      });
      amenities.push({
        icon: "cup-straw",
        title: "Minibar available",
        status: details.isMiniBar,
      });
      amenities.push({
        icon: "p-circle",
        title: "Parking available",
        status: details.isParking,
      });
      amenities.push({
        icon: "egg-fried",
        title: "Breakfast available",
        status: details.isBreakfast,
      });

      setAmenities(amenities);
      setDetails(result["data"]);
      console.log(result["data"]);
    } else {
      toast.error(result["error"]);
    }
  };

  useEffect(() => {
    loadProductDetails();
  }, []);

  return (
    <div>
      {details && (
        <div className="mt-5">
          <h3 style={{ fontSize: 26 }}>{details.title}</h3>
          <hr />

          <img className="mt-2" style={{ height: 300 }} src={`${config.url}/image/${details.profileImage}`} />
          <div className="mt-2">
            <h4 className="mt-2"> {details.address}</h4>
            <div>
              {details.beds} beds, {details.bathrooms} bathrooms
            </div>
          </div>
          <hr />

          <div className="mt-3">
            <div>
              Hosted by: <span style={{ fontWeight: "bold" }}>{details.ownerName}</span>
            </div>
            <div>{details.contactNo}</div>
            <hr />
          </div>
          <div className="mt-3">
            <h4>About the place</h4>
            <div>{details.details}</div>
            <hr />
          </div>

          <div className="mt-3">
            <h4>This place offers</h4>
            <div className="row">
              <div className="col">
                {amenities.map((amenity) => {
                  return (
                    <div>
                      <i className={`bi bi-${amenity.icon}`} style={{ fontSize: 30 }} />
                      <span
                        className="ms-3"
                        style={{
                          textDecoration: amenity.status == 0 ? "line-through" : "none",
                        }}
                      >
                        {amenity.title}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="col"></div>
              <div className="col"></div>
            </div>

            <div className="mt-5">
              <Link to="/home" className="btn btn-primary">
                Back
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
