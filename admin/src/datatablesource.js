export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "username",
    headerName: "Country",
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

export const orderColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];


export const productColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
  },
  {
    field: "buyingPrice",
    headerName: "Buying Price",
    width: 100,
  },
  {
    field: "minSellingPrice",
    headerName: "Min Selling Price",
    width: 100,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 100,
  },
];

export const transactionColumns = [
  { field: "_id", headerName: "ID", width: 100 },
  {
    field: "productName",
    headerName: "Product",
    width: 150,
 
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 70,
  },
  {
    field: "sellingPrice",
    headerName: "Selling Price",
    width: 70,
  },
  {
    field: "totalPrice",
    headerName: "Price",
    width: 70,
  },
  {
    field: "paymentMethod",
    headerName: "Payment Method",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  },
];


export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];
