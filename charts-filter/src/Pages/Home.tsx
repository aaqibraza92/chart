import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Charts } from "../Component/Charts";

export const Home: React.FC = () => {
  return (
    <>
   <section>
    <Container>
    <Charts/>
    </Container>
   </section>
      
    </>
  );
};
