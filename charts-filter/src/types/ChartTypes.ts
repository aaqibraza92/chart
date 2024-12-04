export interface ChartData {
    name: string;
    y: number;
  }
  
  export interface ChartOptions {
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