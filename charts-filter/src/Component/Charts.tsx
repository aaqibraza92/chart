import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";
import axios from "axios";
import PieChart from "./PieChart";
import { selectedProd, setAllCategories, setAllProducts, setSelectedCategories } from "../Reducer/PieSlice";
import { useDispatch } from "react-redux";
import { Product } from "../types/ProductInterface";
import { Category } from "../types/CategoryInterface";


export const Charts: React.FC = () => {
  const dispatch = useDispatch();
  //category part
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCat, setSelectedCat] = useState<string>("");
  const handleChangeCat = (event: SelectChangeEvent) => {
    setSelectedCat(event.target.value);
    dispatch(setSelectedCategories(event.target.value))
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>(
        "https://dummyjson.com/products/categories"
      );
      if (response?.status === 200) {
        setCategories(response?.data);
       
 
        dispatch(setAllCategories(response?.data));
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  //category part

  //product part
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get<{ products: Product[] }>(
        "https://dummyjson.com/products"
      );
      setProducts(response.data.products);
      dispatch(setAllProducts(response.data.products));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const productHandleChange = (event: SelectChangeEvent<number[]>) => {
    const value = event.target.value as number[];
    setSelectedProducts(value);
  };

  const clearState = () => {
    setSelectedProducts([]);
    setSelectedCat("");
  };

  const selectedProductTitles = products
    .filter((product) => selectedProducts.includes(product.id))
    .map((product) => product.title);

    dispatch(selectedProd(selectedProductTitles));

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  //chart js
  // const chartOptions: Options = {
  //   chart: {
  //     type: "column",
  //   },
  //   title: {
  //     text: `Products in ${selectedCat}`,
  //   },
  //   series: [
  //     {
  //       // `type: column` is required for type-checking this options as a column series
  //       type: "column",
  //       data: [1, 2, 3, 4, 5, 6],
  //     },
  //   ],
  //   xAxis: {
  //     categories: ["Foo", "Xyx", "Baz", "Aaqib"],
  //     labels: {
  //       useHTML: true,
  //       formatter: () => "",
  //     },
  //   },
  // };

  //chart js
  const handleClearSelection = () => {
    setSelectedCat("");
    setSelectedProducts([])
  };

  return (
    <>
    
      <section>
        <Container>
          <Row>
            <Col md={3}>
              <section>
                <div className="mb-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <h3>Filters</h3>
                    <button onClick={clearState} className="clearBtn">
                      Clear
                    </button>
                  </div>
                </div>
                <FormControl fullWidth className="mb-4 position-relative">
                  <InputLabel id="category-label">Select Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    value={selectedCat}
                    label="Select Category"
                    onChange={handleChangeCat}
                  >
                    {categories?.map((element, ind) => (
                      <MenuItem key={ind} value={element?.name}>
                        {element?.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <button className="clearbtn" onClick={handleClearSelection}>
                  &times;
      </button>
                </FormControl>

           

                <FormControl fullWidth>
                  <InputLabel id="products-multiple-select-label">
                    Select Products
                  </InputLabel>
                  <Select
                  disabled={selectedCat ? false :true}
                    labelId="products-multiple-select-label"
                    id="products-multiple-select"
                    multiple
                    value={selectedProducts}
                    onChange={productHandleChange}
                    renderValue={(selected) =>
                      selected
                        .map(
                          (productId) =>
                            products.find((product) => product.id === productId)
                              ?.title
                        )
                        .join(", ")
                    }
                  >
                    {products.map((product) => (
                      <MenuItem key={product.id} value={product.id}>
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                        />
                        <ListItemText primary={product.title} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </section>
              <section className="mt-4">
                <Button
                  disabled={selectedProducts?.length > 0 ? false : true}
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: "#316cf4",
                    fontSize: "16px",
                    padding: "10px 20px",
                  }}
                  onClick={() => {}}
                >
                  Run Report
                </Button>
              </section>
            </Col>
            <Col md={9}>
              <PieChart/>
              {/* <HighchartsReact highcharts={Highcharts} options={chartOptions} /> */}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
