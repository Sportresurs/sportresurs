import { useContext } from "react";
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
  const { areas } = useContext(Context);
  const [isModalShown, handleOpenModal, handleCloseModal] = useModalHandlers();
  const { isAdmin } = useIsAdmin();

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
                  isModal={false}
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
