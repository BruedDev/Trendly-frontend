import CART_ROUTES from "./Cart-routes";
import AUTH_ROUTES from "./Auth-routes";
import USER_ROUTES from "./User-routes";
import PAY_ROUTES from "./Pay-routes";
import VIETNAMEREGIONS_ROUTES from "./VietnamRegions-routes";

const API_ROUTES = {
  cart: CART_ROUTES,
  auth: AUTH_ROUTES,
  user: USER_ROUTES,
  pay: PAY_ROUTES,
  VietnamRegions: VIETNAMEREGIONS_ROUTES,
};

export default API_ROUTES;
