import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";

export const Charts: React.FC = () => {
  const chartOptions: Options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Products in selected categories",
    },
    series: [
      {
        // `type: column` is required for type-checking this options as a column series
        type: "column",
        data: [1, 2, 3, 4, 5, 6],
      },
    ],
    xAxis: {
      categories: ["Foo", "Xyx", "Baz", "Aaqib"],
      labels: {
        useHTML: true,
        formatter: () => "",
      },
    },
  };

  return (
    <>
   <section>
    <Container>
   <Row>
    <Col md={3}>
    </Col>
    <Col md={9}>
    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </Col>
   </Row>
    </Container>
   </section>
      
    </>
  );
};
