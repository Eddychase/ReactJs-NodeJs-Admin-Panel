export const userInputs = [
  {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "john_doe",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "john_doe@gmail.com",
  },
  {
    id: "phone",
    label: "Phone",
    type: "text",
    placeholder: "+1 234 567 89",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
  },
  {
    id: "isAdmin",
    label: "IsAdmin",
    placeholder: "true",
  },
];

export const productInputs = [
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "Apple Macbook Pro",
  },
  {
    id: "description",
    label: "Description",
    type: "text",
    placeholder: "Description",
  },
  {
    id: "buyingPrice",
    label: "Buying Price",
    type: "number",
    placeholder: "ksh20000",
  },
  {
    id: "minSellingPrice",
    label: "min Selling Price",
    type: "number",
    placeholder: "ksh20000",
  },
  {
    id: "quantity",
    label: "Quantity",
    type: "number",
    placeholder: "2",
  },
];

export const transactionInputs = [
  
  {
    id: "quantity",
    label: "Quantity",
    type: "number",
    placeholder: "2",
  },
  {
    id: "sellingPrice",
    label: "Selling Price",
    type: "number",
    placeholder: "2",
  },
  {
    id: "totalPrice",
    label: "Total Price",
    type: "number",
    placeholder: "20",
  },
  {
    id: "status",
    label: "Status",
    type: "select",
    options: [
      {
        label: "Approved",
        value: "approved",
      },
      {
        label: "Pending",
        value: "pending",
      },
      {
        label: "Declined",
        value: "declined",
      },
    ],
    placeholder: "Select a status",
  },
  {
    id: "paymentMethod",
    label: "Payment Method",
    type: "select",
    options: [
      {
        label: "Cash",
        value: "cash",
      },
      {
        label: "Mpesa",
        value: "mpesa",
      },
    ],
    placeholder: "Select a payment method",
  },
];


export const roomInputs = [
  {
    id: "title",
    label: "Title",
    type: "text",
    placeholder: "2 bed room",
  },
  {
    id: "desc",
    label: "Description",
    type: "text",
    placeholder: "King size bed, 1 bathroom",
  },
  {
    id: "price",
    label: "Price",
    type: "number",
    placeholder: "100",
  },
  {
    id: "maxPeople",
    label: "Max People",
    type: "number",
    placeholder: "2",
  },
];