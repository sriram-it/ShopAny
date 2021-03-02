import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import * as Data  from '../../../data/data';
import {categories} from '../../../data/data';
import Style from '../CategoryChart/CategoryChart.module.css'

var sevenDays = new Date (Date.now () - 7 * 24 * 60 * 60 * 1000);
var month = new Date (Date.now () - 30 * 24 * 60 * 60 * 1000);
var allTime = new Date (Date.now () - 44000 * 24 * 60 * 60 * 1000);
var selectedTime = sevenDays;
function CategoryChart () {
  var [orders, setOrders] = useState([])
  var [categoryData, setcategoryData] = useState ([]);
  var [categoryName, setcategoryName] = useState ([]);
  let categoryArray = [];
  let categoryNameArray = [];
 
  useEffect (() => {
    setOrders(filterCurrentOrders())
  }, []);

  useEffect(()=>{
    prodData (selectedTime);
  }, [orders])

  const filterCurrentOrders = () => {
    let sellerOrder= []
    for(let i = 0; i < Data.orders.length; i++) {
        if(Data.orders[i].sellerId == Data.currentUser[0].id) {
            sellerOrder.push(Data.orders[i])
        }
    }
    return sellerOrder
}

  const prodData = function (time) {
    for (var i = 0; i < categories.length; i++) {
      if (i != 0) {
        categoryArray.push (0);
        categoryNameArray.push (categories[i].name);
      }
    }
    for (var i = 0; i < orders.length; i++) {
      let catId = orders[i].categoryId;
      if (new Date(orders[i].deliveryDate) > time) {
        categoryArray.splice (
          catId - 1,
          1,
          parseInt (categoryArray[catId - 1]) + 1
        );
      }
    }
    setcategoryName (categoryNameArray);
    setcategoryData (categoryArray);
  };
  const TimeFilter = function (value) {
    if (value == 1) {
      selectedTime = sevenDays;
      prodData (selectedTime);
    } else if (value == 2) {
      selectedTime = month;
      prodData (selectedTime);
    } else {
      selectedTime = allTime;
      prodData (selectedTime);
    }
  };
  const state = {
    labels: categoryName,
    datasets: [
      {
        label: 'Sale',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: categoryData,
      },
    ],
  };

  return (
    <div className={Style.barChart}>
      <div className={Style.chartHeader}>
        <div className={Style.chartTitle}>
          <label>Category Wise Sale</label>
        </div>
        <div className={Style.componentWhole}>
          <label htmlFor="time" className={Style.lblCategory}>Time</label>
          <select
            name="time"
            onChange={event => TimeFilter (event.target.value)}
            className={Style.selCategory}
          >
            <option value={1}>Week</option>
            <option value={2}>Month</option>
            <option value={3}>All Time</option>
          </select>
        </div>
      </div>
      <Bar 
        data={state}
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

export default CategoryChart;
