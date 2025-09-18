// utils for cart calculations

export function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Apply discount to total price
export function applyDiscount(total, discountPercent) {
  return total - (total * discountPercent) / 100;
}

// Get coupon discount details
export function getcoupandiscount(couponCode, totalPrice) {
  let discountPercent = 0;

  switch (couponCode) {
    case "RATAN10":
      discountPercent = 10;
      break;
    case "RATAN20":
      discountPercent = 20;
      break;
    case "RATAN30":
      discountPercent = 30;
      break;
    default:
      discountPercent = 0;
  }
// Calculate discount amount
  const discountAmount = (totalPrice * discountPercent) / 100;

  return {
    isValid: discountPercent > 0,
    discountPercent,
    discountAmount,
    finalPrice: totalPrice - discountAmount,
  };
}
