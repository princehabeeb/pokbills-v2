function GetUserPrice({ user, item }) {
  let price;

  switch (user?.account_type) {
    case 'subscriber':
      price = item?.userprice;
      break;
    case 'agent':
      price = item?.agentprice;
      break;
    case 'vendor':
      price = item?.vendorprice;
      break;
    case 'dealer':
      price = item?.dealerprice;
      break;
    default:
      price = item?.userprice;
  }
  return price;
}

export default GetUserPrice;

export const GetCurrentUserPrice = ({ user, data: p }) => {
  let price;
  switch (user?.account_type?.toLowerCase()) {
    case 'subscriber':
      price = p?.userprice;
      break;
    case 'agent':
      price = p?.agentprice;
      break;
    case 'vendor':
      price = p?.vendorprice;
      break;
    default:
      price = p?.userprice;
  }
  return price;
};
