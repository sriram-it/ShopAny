import React, {useEffect, useState} from 'react';
import * as Data from '../../../data/data';
import {Bar} from 'react-chartjs-2';
import Style from '../ProductChart/ProductChart.module.css';

function ProductChart () {
  var [products, setProducts] = useState([])
  var [productLabel, setProductLabel] = useState ([]);
  var [productData, setProductData] = useState ([]);
  var [selectedCategory, setSelectedCategory] = useState (1);
  var productDataArray = [];
  var labelDataArray = [];
  var sevenDays = new Date (Date.now () - 7 * 24 * 60 * 60 * 1000);
  var month = new Date (Date.now () - 30 * 24 * 60 * 60 * 1000);
  var allTime = new Date (Date.now () - 44000 * 24 * 60 * 60 * 1000);
  var [selectedTime, setSelectedTime] = useState (sevenDays);


  useEffect(()=>{
    setProducts(filtetCurrentUserProducts())
  }, [])

  useEffect (() => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].categoryId == 1) {
        labelDataArray.push (products[i].name);
        productDataArray.push (0);
      }
    }
    setProductLabel (labelDataArray);
  }, [products]);

  useEffect (
    () => {
      getProducts (selectedCategory, selectedTime);
    },
    [selectedTime]
  );

  useEffect (
    () => {
      getProducts (selectedCategory, selectedTime);
    },
    [productLabel]
  );

  const filtetCurrentUserProducts = () => {
    let sellerProducts = []
    for(let i = 0; i < Data.products.length; i++) {
        if(Data.products[i].sellerId == Data.currentUser[0].id) {
            sellerProducts.push(Data.products[i])
        }
    }
    return sellerProducts
  }

  const TimeFilter = function (value) {
    if (parseInt (value) == 1) {
      setSelectedTime (sevenDays);
    } else if (parseInt (value) == 2) {
      setSelectedTime (month);
    } else {
      setSelectedTime (allTime);
    }
  };
  const getProducts = function (value, time) {
    var productMap = new Map ();
    productDataArray = [];
    if (productDataArray.length == 0) {
      for (let i = 0; i < products.length; i++) {
        if (products[i].categoryId == value) {
          productDataArray.push (0);
        }
      }
    }
    if (labelDataArray.length == 0) {
      for (let i = 0; i < products.length; i++) {
        if (products[i].categoryId == value) {
          labelDataArray.push (products[i].name);
        }
      }
    }
    for (var i = 0; i < Data.orders.length; i++) {
      if ((Data.orders[i].sellerId == Data.currentUser[0].id) && (Data.orders[i].categoryId == value)) {
        let productName = Data.orders[i].productName;
        let deliveryDate = new Date(Data.orders[i].deliveryDate);
        if (deliveryDate.getTime () > time.getTime ()) {
          if (productMap.has (productName)) {
            productMap.set (productName, productMap.get (productName) + 1);
          } else {
            productMap.set (productName, 1);
          }
        }
      }
    }
    var tempProductKeys = productMap.keys ();
    for (var tempProductKey of tempProductKeys) {
      let index = labelDataArray.indexOf (tempProductKey);
      productDataArray.splice (index, 1, productMap.get (tempProductKey));
    }
    setProductData (productDataArray);
  };
  const getLabels = function (value) {
    productDataArray = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].categoryId == value) {
        labelDataArray.push (products[i].name);
        productDataArray.push (0);
      }
    }
    setSelectedCategory (parseInt (value));
    setProductLabel (labelDataArray);
  };
  const lineChartData = {
    labels: productLabel,
    datasets: [
      {
        label: 'Sale',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: productData,
      },
    ],
  };
  return (
    <div className={Style.productChart}>
      <div className={Style.chartHeader}>
        <div className={Style.chartTitle}>
          <label>Product Wise Sale</label>
        </div>
        <div className={Style.componentWhole}>
          <label htmlFor="cat" className={Style.lblCategory}>Category</label>
          <select
            name="categories"
            onChange={e => getLabels (e.target.value)}
            className={Style.selCategory}
          >
            {Data.categories.map ((category, index) => {
              if (index != 0) {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              }
            })}
          </select>
          <label htmlFor="time" className={Style.lblCategory}>Time</label>
          <select
            name="time"
            onChange={event => TimeFilter (event.target.value)}
          >
            <option value={1}>Week</option>
            <option value={2}>Month</option>
            <option value={3}>All Time</option>
          </select>
        </div>

      </div>
      <Bar
        data={lineChartData}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  precision: 0,
                },
              },
            ],
          },
          legend: {
            display: true,
            position: 'right',
          },
        }}
      />
    </div>
  );
}
export default ProductChart;
