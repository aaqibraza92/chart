  export interface Category {
    slug: string;
    name: string;
    url: string;
  }

  export interface CategoryProps{
    category: string; // Assuming `selectedCat` is an array of strings
  }