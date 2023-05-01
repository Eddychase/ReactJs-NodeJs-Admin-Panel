export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  
  {
    field: "username",
    headerName: "Username",
    width: 100,
  },


  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  
  {
    field: "phone",
    headerName: "Phone Number",
    width: 100,
  },


  {
    field: "isAdmin",
    headerName: "Admin",
    width: 100,
  },
];


export const productColumns = [
  
  {
    field: "name",
    headerName: "Name",
    width: 250,
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
  },
  {
    field: "buyingPrice",
    headerName: "Buying Price",
    width: 150,
  },
  {
    field: "minSellingPrice",
    headerName: "Min Selling Price",
    width: 150,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 100,
  },
];

export const transactionColumns = [
  
  {
    field: "productName",
    headerName: "Product",
    width: 250,
 
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 100,
  },
  {
    field: "sellingPrice",
    headerName: "Selling Price",
    width: 150,
  },
  {
    field: "totalPrice",
    headerName: "Price",
    width: 100,
  },
  {
    field: "paymentMethod",
    headerName: "Payment Method",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
  },
];

