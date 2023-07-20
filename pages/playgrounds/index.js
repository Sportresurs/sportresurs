import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Context } from "../../context";
import s from "./Playgrounds.module.scss";
import CourtCard from "../../components/CourtCard";
import { Grid } from "../../components/Grid";
import Filters from "../../components/Filters";
import PlusIcon from "../../components/PlusIcon/PlusIcon";
import AdminPlaygroundModal from "../../components/AdminPlaygroundModal";
import useModalHandlers from "../../utils/hooks/useModalHandlers";
import useIsAdmin from "../../utils/hooks/useIsAdmin";

export default function Playgrounds({ playgrounds }) {
  const router = useRouter();
  const { areas } = useContext(Context);
  const [isModalShown, handleOpenModal, handleCloseModal] = useModalHandlers();
  const { isAdmin } = useIsAdmin();
  const [urlHash, setUrlHash] = useState("");

  useEffect(() => {
    setUrlHash(window.location.hash);
    const handleHashChange = () => setUrlHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className={s.background}>
      <section className={s.courts}>
        <Grid>
          <Filters areas={playgrounds} />
          {isAdmin ? <PlusIcon onClick={() => handleOpenModal()} /> : null}
          <ul className={s.list}>
            {areas.map((court) => (
              <li key={court.id} className={s.listItem}>
                <CourtCard
                  courtInfo={court}
                  variant="courtList"
                  urlHash={urlHash}
                  addHashToUrl={() => {
                    setUrlHash(`#${court.id}`);
                    // eslint-disable-next-line
                    router.push(`/playgrounds#${court.id}`, undefined, { shallow: true });
                  }}
                  removeHashFromUrl={() => {
                    setUrlHash("");
                    router.push("/playgrounds", undefined, { shallow: true });
                  }}
                />
              </li>
            ))}
          </ul>
        </Grid>
      </section>
      <AdminPlaygroundModal visible={isModalShown} onClose={handleCloseModal} />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/areas`);
  const data = await res.json();
  return {
    props: {
      playgrounds: data.areas,
    },
  };
}
