import { configureStore, createSlice } from "@reduxjs/toolkit";

// -------------------- Product Slice --------------------
const productSlice = createSlice({
  name: "products",
  initialState: {
    Veg: [
      { id: 101, name: "Potato", price: 30, image: "/image/PoToTo.jpg", description: "Fresh and healthy potatoes" },
      { id: 102, name: "Tomato", price: 50, image: "/image/Tomoto.jpg", description: "Juicy red tomatoes" },
      { id: 103, name: "Brinjal", price: 90, image: "/image/BRINGAL.jpg", description: "Fresh green brinjal" },
      { id: 104, name: "Cabbage", price: 60, image: "/image/cabbage.jpg", description: "Fresh green cabbage" },
      { id: 105, name: "Spinach", price: 40, image: "/image/SPINACH.jpg", description: "Healthy leafy spinach" },
      { id: 106, name: "Carrot", price: 80, image: "/image/CArret.jpg", description: "Crunchy and sweet carrots" },
      { id: 107, name: "Onion", price: 100, image: "/image/ONION.jpg", description: "Fresh and healthy onion" },
      { id: 108, name: "Broccoli", price: 85, image: "/image/BROCALI.jpg", description: "Fresh green broccoli" },
      { id: 109, name: "Bittergourd", price: 75, image: "/image/bitter-gourd.jpg", description: "Fresh and healthy cauliflower" },
      { id: 110, name: "Pumpkin", price: 100, image: "/image/pamkin.jpg", description: "Fresh and healthy pumpkin" },
      { id: 111, name: "Beetroot", price: 85, image: "/image/Beetroot.jpg", description: "Fresh and healthy zucchini" },
      { id: 112, name: "Bell Pepper", price: 195, image: "/image/bellpepper.jpg", description: "Fresh and crunchy bell pepper" },
    ],
    Nonveg: [
      { id: 2001, name: "Chicken Biryani", price: 250, image: "/image/chikenbiriyani.jpeg", description: "Aromatic rice with chicken." },
      { id: 2002, name: "Mutton Rogan Josh", price: 320, image: "/image/muttoncurry.jpeg", description: "Rich Kashmiri mutton curry." },
      { id: 2003, name: "Grilled Fish", price: 100, image: "/image/fishspecial.jpeg", description: "Fresh fish grilled with herbs." },
      { id: 2004, name: "Butter Chicken", price: 200, image: "/image/buterchicken.jpg", description: "Creamy tomato gravy with chicken." },
      { id: 2005, name: "Prawn Masala", price: 350, image: "/image/pawanmasal.jpg", description: "Spicy prawn curry with onions." },
      { id: 2006, name: "Fish Curry", price: 250, image: "/image/Fishspecial.jpg", description: "Spicy fish curry with coconut milk." },
      { id: 2007, name: "Tandoori Chicken", price: 350, image: "/image/tandoori.jpg", description: "Spicy grilled chicken with yogurt." },
      { id: 2008, name: "Chicken Tikka Masala", price: 300, image: "/image/tikka.jpg", description: "Grilled chicken in creamy tomato sauce." },
      { id: 2009, name: "Mutton Biryani", price: 400, image: "/image/muttonbiriayni.jpg", description: "Fragrant rice with tender mutton." },
      { id: 2010, name: "Fish Tikka", price: 150, image: "/image/fishtikka.jpg", description: "Grilled fish marinated in spices." },
      { id: 2011, name: "Prawn Tikka", price: 200, image: "/image/prawntikka.jpg", description: "Grilled prawns marinated in spices." },
      { id: 2012, name: "Chicken Curry", price: 180, image: "/image/chikkencurry.jpg", description: "Spicy chicken curry with onions." },
    ],
    Fruits: [
      { id: 3001, name: "Apple", price: 80, image: "/image/Apple.jpg", description: "Crisp and juicy apples." },
      { id: 3002, name: "Banana", price: 40, image: "/image/BaNana.jpg", description: "Soft and sweet bananas." },
      { id: 3003, name: "Grapes", price: 50, image: "/image/Greps-HD.jpeg", description: "Sweet and juicy grapes." },
      { id: 3004, name: "Papaya", price: 90, image: "/image/Papaya-HD.jpeg", description: "Mouth-watering papaya." },
      { id: 3005, name: "Mango", price: 100, image: "/image/Mango.jpg", description: "Tropical and sweet mango." },
      { id: 3006, name: "Pineapple", price: 150, image: "/image/painapple.jpg", description: "Juicy and tangy pineapple." },
      { id: 3007, name: "Orange", price: 80, image: "/image/Orange0.jpg", description: "Citrusy and refreshing orange." },
      { id: 3008, name: "Watermelon", price: 120, image: "/image/WatretMillon.jpg", description: "Hydrating and sweet watermelon." },
      { id: 3009, name: "Strawberries", price: 150, image: "/image/straberry.jpg", description: "Fresh and juicy strawberries." },
      { id: 3010, name: "Blueberries", price: 250, image: "/image/blueberries.jpg", description: "Sweet and tangy blueberries." },
      { id: 3011, name: "Blackberries", price: 200, image: "/image/balckberrys.jpg", description: "Rich and flavorful blackberries." },
      { id: 3012, name: "Raspberries", price: 50, image: "/image/raspberri-n.jpg", description: "Delicate and sweet raspberries." },
    ],
    Juices: [
      { id: 4001, name: "Orange Juice", price: 150, image: "/image/a-org.png", description: "Freshly squeezed orange juice." },
      { id: 4002, name: "Apple Juice", price: 120, image: "/image/a-apple.png", description: "Crisp and refreshing apple juice." },
      { id: 4003, name: "Grape Juice", price: 180, image: "/image/a-grp.png", description: "Sweet and tangy grape juice." },
      { id: 4004, name: "Pineapple Juice", price: 200, image: "/image/a-panapple.png", description: "Tropical pineapple juice." },
      { id: 4005, name: "Mango Juice", price: 250, image: "/image/Mangojuice.jpg", description: "A blend of seasonal fruits." },
      { id: 4006, name: "Watermelon Juice", price: 220, image: "/image/a-water.png", description: "Refreshing watermelon juice." },
      { id: 4010, name: "Pomegranate Juice", price: 400, image: "/image/Pomegranate.png", description: "A mix of tropical fruits." },
      { id: 4008, name: "Papaya Juice", price: 250, image: "/image/a-papaya.png", description: "A blend of mixed berries." },
      { id: 4009, name: "Mixed Berry Juice", price: 350, image: "/image/BERRY.png", description: "A refreshing blend of berries." },
      { id: 4007, name: "Chikoo Juice", price: 300, image: "/image/SAPOTA.png", description: "Rich and flavorful chikoo juice." },
      { id: 4011, name: "Coconut Juice", price: 100, image: "/image/COCO.png", description: "Creamy and refreshing coconut juice." },
      { id: 4012, name: "Mixed Fruit Juice", price: 500, image: "/image/MIXED-FRU.png", description: "A blend of various tropical fruits." },
    ],
  },
  reducers: {},
});

// -------------------- Cart Slice --------------------
const initialCartState = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      const item = state.find((i) => i.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      return state.filter((i) => i.name !== action.payload);
    },
    increaseQty(state, action) {
      const item = state.find((i) => i.name === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQty(state, action) {
      const item = state.find((i) => i.name === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    clearCart() {
      return [];
    },
  },
});

// -------------------- Order Slice --------------------
const orderSlice = createSlice({
  name: "order",
  initialState: [],
  reducers: {
    addToOrder: (state, action) => {
      state.push({
        id: Date.now(),
        items: action.payload.items,
        finalPrice: action.payload.finalPrice,
        time: new Date().toLocaleString(),
      });
    },
    clearOrders: () => {
      return [];
    },
  },
});

// -------------------- Authentication Slice --------------------
const loadAuthState = () => {
  try {
    const saved = localStorage.getItem("auth");
    return saved ? JSON.parse(saved) : { users: [], currentUser: null, isAuthenticated: false };
  } catch {
    return { users: [], currentUser: null, isAuthenticated: false };
  }
};

const authenticationSlice = createSlice({
  name: "auth",
  initialState: loadAuthState(),
  reducers: {
    registerUser: (state, action) => {
      state.users.push(action.payload);
    },
    loginUser: (state, action) => {
      const { username, password } = action.payload;
      const foundUser = state.users.find(
        (user) => user.username === username && user.password === password
      );
      if (foundUser) {
        state.currentUser = foundUser;
        state.isAuthenticated = true;
      } else {
        state.currentUser = null;
        state.isAuthenticated = false;
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
});

export const { addItem, removeFromCart, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
export const { addToOrder, clearOrders } = orderSlice.actions;
export const { registerUser, loginUser, logoutUser } = authenticationSlice.actions;

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    auth: authenticationSlice.reducer,
  },
});

// ✅ Persist cart + auth state
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart));
  localStorage.setItem("auth", JSON.stringify(state.auth));
});

export default store;
