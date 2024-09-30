import React from "react";
import axios from "axios";
import NotFound from "../../404/Page404";
import style from "./playground.module.scss";
import PlaygroundModalContent from "../../../components/PlaygroundModalContent";

const PlaygroundDetails = ({ playground, error }) => {
  if (error) {
    return <NotFound />;
  }

  const { area } = playground;
  const { color } = area?.District || { color: "#f2ba4c" };

  return (
    <div className={style.courts}>
      <PlaygroundModalContent playground={area} color={color} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  let playground = null;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST}/api/areas/${id}`
    );
    playground = data;
  } catch (error) {
    return { props: { playground: null, error: "Playground not found" } };
  }

  return {
    props: {
      playground,
    },
  };
}

export default PlaygroundDetails;
