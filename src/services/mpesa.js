// M-Pesa STK Push simulation – replace with a real backend call
export const initiateSTKPush = async (phone, amount, accountRef) => {
  // In production: POST to your own server that handles Daraja API
  console.log(`Initiating M-Pesa payment: ${phone}, amount ${amount}, ref ${accountRef}`);
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 1000));
  // Return a mock success for demonstration
  return {
    success: true,
    checkoutRequestID: "ws_CO_" + Date.now(),
    message: "Payment request sent to phone",
  };
};

export const queryPaymentStatus = async (checkoutRequestID) => {
  console.log(`Querying payment status for ${checkoutRequestID}`);
  await new Promise((r) => setTimeout(r, 500));
  return { success: true, resultCode: 0, resultDesc: "Success" };
};