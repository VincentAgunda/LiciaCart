import {
  StarRounded,
  StarBorderRounded,
} from "@mui/icons-material";

const StarRating = ({
  rating = 0,
  max = 5,
  size = 18,
  showValue = false,
}) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[...Array(max)].map((_, i) =>
          i < Math.round(rating) ? (
            <StarRounded
              key={i}
              sx={{
                fontSize: size,
                color: "#f5b301",
              }}
            />
          ) : (
            <StarBorderRounded
              key={i}
              sx={{
                fontSize: size,
                color: "#d1d5db",
              }}
            />
          )
        )}
      </div>

      {showValue && (
        <span className="ml-1 text-sm text-gray-500 font-medium">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;