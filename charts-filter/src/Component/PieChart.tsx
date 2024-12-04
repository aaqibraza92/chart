import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { useDispatch, useSelector } from "react-redux";
import { setAllCategories, setSelectedCategories } from "../Reducer/PieSlice";
import { RootState } from "../store";
import axios from "axios";
import { CategoryProps } from "../types/CategoryInterface";


interface ChartData {
  name: string;
  y: number;
}

interface ChartOptions {
  chart: {
    type: string;
  };
  title: {
    text: string;
  };
  series: Array<{
    name: string;
    data: ChartData[];
  }>;
}

const PieChart: React.FC = () => {
  const allCategoriesList = useSelector(
    (state: RootState) => state?.chartData?.allCategories
  );
  const selectedCategory = useSelector(
    (state: RootState) => state?.chartData?.selectedCategory
  );
  const allProductsLists = useSelector(
    (state: RootState) => state?.chartData?.allProducts
  );
  const selectedProducts = useSelector(
    (state: RootState) => state?.chartData?.selectedProd
  );
  const selectedCategoryProducts = allProductsLists.filter(
    (items) => items.category === selectedCategory
  );



  const [chartData, setChartData] = useState<ChartData[]>([]);

  // State for the chart options
  const [options, setOptions] = useState<ChartOptions>({
    chart: {
      type: "pie",
    },
    title: {
      text: "My Pie Chart",
    },
    series: [
      {
        name: "Categories",
        data: [], // Initial empty data
      },
    ],
  });

  const generateInitialData = () => {
    var initialChartData: ChartData[] = [];
    if (selectedCategory === "") {
        allCategoriesList?.length > 0 &&
          allCategoriesList?.forEach((e) => {
            initialChartData.push({
              name: e?.name,
              y: Math.random() * 100,
            });
          });
        setChartData(initialChartData);
      } else {
        if (selectedCategoryProducts?.length > 0) {
          selectedCategoryProducts.forEach((product) => {
            initialChartData.push({
              name: product?.title, // Ensure `title` exists in `selectedCategoryProducts`
              y: Math.random() * 100,
            });
          });
      
          setChartData(initialChartData);
        //   console.log("selectedCategory", initialChartData);
        } else {
          console.warn("No products found for the selected category.");
        }
      }
      
 

  };

  useEffect(() => {
    generateInitialData();
  }, [allCategoriesList,selectedCategory]); // Empty dependency array to run only once on mount


  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      series: [
        {
          ...prevOptions.series[0],
          data: chartData, // Update the data dynamically
        },
      ],
    }));
    // alert("upp")
  }, [chartData]);

  const handleStateChange = () => {
    setChartData([
      { name: "Electronics", y: Math.random() * 100 },
      { name: "Groceries", y: Math.random() * 100 },
      { name: "Clothing", y: Math.random() * 100 },
    ]);
  };

  const dispatch = useDispatch();


  return (
    <div>
        <h2 className="text-center">{selectedCategory}</h2>
      {/* <button onClick={handleStateChange}>Update Chart</button> */}

      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PieChart;
