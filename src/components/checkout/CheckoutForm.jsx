import {
  PersonOutlineRounded,
  PhoneOutlined,
  LocationOnOutlined,
  HomeOutlined,
} from "@mui/icons-material";

const CheckoutForm = ({
  formData,
  onChange,
}) => {
  return (
    <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold tracking-tight">
          Shipping Address
        </h2>

        <p className="text-gray-400 mt-2">
          Enter your delivery information
        </p>
      </div>

      <div className="space-y-5">
        <div className="relative">
          <PersonOutlineRounded
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            required
            name="fullName"
            value={formData.fullName}
            onChange={onChange}
            placeholder="Full Name"
            className="w-full h-14 pl-14 pr-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-black outline-none transition-all duration-300"
          />
        </div>

        <div className="relative">
          <PhoneOutlined
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            required
            name="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="Phone Number"
            className="w-full h-14 pl-14 pr-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-black outline-none transition-all duration-300"
          />
        </div>

        <div className="relative">
          <LocationOnOutlined
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            required
            name="city"
            value={formData.city}
            onChange={onChange}
            placeholder="City"
            className="w-full h-14 pl-14 pr-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-black outline-none transition-all duration-300"
          />
        </div>

        <div className="relative">
          <HomeOutlined className="absolute left-5 top-5 text-gray-400" />

          <textarea
            required
            name="address"
            value={formData.address}
            onChange={onChange}
            placeholder="Detailed Address"
            rows="5"
            className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-black outline-none transition-all duration-300 resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;