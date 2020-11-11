import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

class Layout extends React.Component {
  componentDidMount() {
    this.props.initBrands();
    this.props.initProducts();
    this.props.initFetchPlans();


   if(this.props.token) {
this.props.fetchUser() 
// this.props.initFetchOrders()
// this.props.initCart()
   } 
  }

  render() {
    return <main>{this.props.children}</main>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
    cart: state.cart.cart,
    cart_items: state.cart.cart_items,
    token: state.auth.token,
    current_user: state.auth.current_user,
    brands: state.brand.select,
    products: state.product.select,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initProducts: () => dispatch(actions.initProducts()),
    initBrands: () => dispatch(actions.initBrands()),
    initFetchPlans: () => dispatch(actions.initFetchPlans()),
    initFetchOrders: () => dispatch(actions.initFetchOrders()),
    fetchUser: () => dispatch(actions.fetchUser()),
    initCart: () => dispatch(actions.initCart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
