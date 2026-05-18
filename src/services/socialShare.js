export const shareOnTwitter = (text, url) => {
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`,
    "_blank"
  );
};

export const shareOnFacebook = (url) => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    "_blank"
  );
};

export const shareOnInstagram = () => {
  if (navigator.share) {
    navigator.share({ title: "Check this out", url: window.location.href });
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied! Share it on Instagram.");
  }
};