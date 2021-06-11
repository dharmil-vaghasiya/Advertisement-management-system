import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import SignUpInf from "./Components/influencers/SignUpInf";
import SignUpShop from "./Components/shops/SignUpShop";
import About from "./About";
import Newtosite from "./Newtosite";
import LoginInf from "./Components/influencers/Logininf";
import LoginShop from "./Components/shops/Login";
import Infhome from "./Components/influencers/Infhome";
import InfEditProfile from "./Components/influencers/InfEditProfile";
import Shophome from "./Components/shops/Shophome";
import Admin from "./Components/admin/admin";
import AddManager from "./Components/admin/addManager";
import DeleteManager from "./Components/admin/deleteManager";
import Managersignin from "./Components/siteManager/managersignin";
import SiteManager from "./Components/siteManager/SiteManager";
import ResetInf from "./Components/influencers/resetInf";
import NewPasswordInf from "./Components/influencers/newPasswordInf";
import ResetShop from "./Components/shops/resetShop";
import NewPasswordShop from "./Components/shops/newPasswordShop";
import ResetManager from "./Components/siteManager/resetManager";
import NewPasswordManager from "./Components/siteManager/newPasswordManager";
import InfDetail from "./Components/shops/InfDetail";
import InfProfilelook from "./Components/influencers/InfProfilelook";
import ShopDetail from "./Components/influencers/ShopDetail";
import Consignments from "./Components/influencers/consignments";
import CurrentConsignments from "./Components/influencers/CurrentConsignments";
import ShopPendingRequests from "./Components/shops/ShopPendingRequests";
import Shopconsignments from "./Components/shops/shopconsignments";
import ShopCurrentConsignments from "./Components/shops/ShopCurrentConsignments";
import PayRazorpay from "./Components/shops/payRazorpay";
import Transaction from "./Components/siteManager/Transaction";
import ShopConsignmentsHistory from "./Components/shops/ConsignmentHistory";
import InfconsignmentHistory from "./Components/influencers/ConsignmentHistory";
function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signinshop" component={LoginShop} />
      <Route exact path="/signupInf" component={SignUpInf} />
      <Route exact path="/signupShop" component={SignUpShop} />
      <Route exact path="/about" component={About} />
      <Route exact path="/Newtosite" component={Newtosite} />
      <Route exact path="/signininf" component={LoginInf} />
      <Route exact path="/Infhome" component={Infhome} />
      <Route exact path="/InfEditProfile" component={InfEditProfile} />
      <Route exact path="/Shophome" component={Shophome} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/addManager" component={AddManager} />
      <Route exact path="/deleteManager" component={DeleteManager} />
      <Route exact path="/signinmanager" component={Managersignin} />
      <Route exact path="/siteManager" component={SiteManager} />
      <Route exact path="/resetInf" component={ResetInf} />
      <Route exact path="/resetInf/:token" component={NewPasswordInf} />
      <Route exact path="/resetShop" component={ResetShop} />
      <Route exact path="/resetShop/:token" component={NewPasswordShop} />
      <Route exact path="/resetManager" component={ResetManager} />
      <Route exact path="/resetManager/:token" component={NewPasswordManager} />
      <Route exact path="/infDetail" component={InfDetail} />
      <Route exact path="/infProfilelook" component={InfProfilelook} />
      <Route
        exact
        path="/shopPendingRequests"
        component={ShopPendingRequests}
      />
      <Route exact path="/shopDetail" component={ShopDetail} />
      <Route exact path="/consignments" component={Consignments} />
      <Route
        exact
        path="/currentconsignments"
        component={CurrentConsignments}
      />
      <Route exact path="/shopconsignments" component={Shopconsignments} />
      <Route
        exact
        path="/shopCurrentConsignments"
        component={ShopCurrentConsignments}
      />
      <Route exact path="/payRazorpay" component={PayRazorpay} />
      <Route exact path="/transaction" component={Transaction} />
      <Route
        exact
        path="/shopConsignmentsHistory"
        component={ShopConsignmentsHistory}
      />
      <Route
        exact
        path="/infconsignmentHistory"
        component={InfconsignmentHistory}
      />
    </Switch>
  );
}

export default App;
