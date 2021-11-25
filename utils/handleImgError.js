import placeholderImg from "../public/img/placeholderImgCard.png";

const handleImgError = (e) => {
  e.target.src = placeholderImg.src;
};

export default handleImgError;
