import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import AppBar from '@material-ui/core/AppBar';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { gql, useLazyQuery, NetworkStatus } from "@apollo/client";
import Product from './Product';
import './App.css'

const GET_PRODUCTS = gql`
  query getProducts($name: String!){
    getProduct(name: $name){
      name
      manufacturer
      color
      awailability
      id
    }
  }
`;

const App = () => {

  const [getProducts, { loading, data, refetch, networkStatus }] = useLazyQuery(GET_PRODUCTS, {
    fetchPolicy: "network-only"
  });

  const [ products, setProducts ] = useState([]);
  const [ value, setValue ] = useState(0);

  useEffect(() => {
    if(data && data.getProduct) setProducts(data.getProduct);  
  }, [data, loading])

  const getProductsFromApi = async (product) => {
      setProducts([]);
      getProducts({ 
        variables: { name: product },
        pollInterval: 5000,
        notifyOnNetworkStatusChange: true,
      });
  }

  if (networkStatus === NetworkStatus.refetch) console.log("refetch??");

  return (
    <div className="App" style={{ padding: "10vh" }}>
      <AppBar>
      <BottomNavigation value={value} onChange={(_event, newValue) => {setValue(newValue);}} showLabels >
        <BottomNavigationAction label="Beanies" onClick={() => getProductsFromApi('beanies')} />
        <BottomNavigationAction label="Gloves" onClick={() => getProductsFromApi('gloves')} />
        <BottomNavigationAction label="Facemasks" onClick={() => getProductsFromApi('facemasks')} />
        {loading ? <CircularProgress /> : null}
      </BottomNavigation>
      </AppBar>
      <div style={{ width: "80%", margin: "auto", marginTop: "5vh"}}>
        {products.length > 1 ? <Product products={products} /> : !loading ? <span>select a category...</span> : null }
      </div>
    </div>
  );
}

export default App;
