import axios from "axios";

export default function getPicture(courtNumber, set) {
  axios
    .get(`${process.env.NEXT_PUBLIC_HOST}api/images/${courtNumber}`)
    .then(({ data }) => {
      if (data) {
        set(true);
      } else set(false);
    })
    .catch((err) => err);
}
