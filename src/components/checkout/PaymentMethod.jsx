const PaymentMethod = ({ selected, onSelect }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Payment Method</h2>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="payment"
          value="mpesa"
          checked={selected === "mpesa"}
          onChange={() => onSelect("mpesa")}
        />
        M-Pesa
      </label>
      <label className="flex items-center gap-2 mt-2">
        <input
          type="radio"
          name="payment"
          value="card"
          checked={selected === "card"}
          onChange={() => onSelect("card")}
        />
        Credit / Debit Card (coming soon)
      </label>
    </div>
  );
};

export default PaymentMethod;