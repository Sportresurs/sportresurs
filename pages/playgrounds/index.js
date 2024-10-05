import { useRouter } from "next/router";
import s from "./Playgrounds.module.scss";
import CourtCard from "../../components/CourtCard";
import { Grid } from "../../components/Grid";
import Filters from "../../components/Filters";
import PlusIcon from "../../components/PlusIcon/PlusIcon";
import AdminPlaygroundModal from "../../components/AdminPlaygroundModal";
import useModalHandlers from "../../utils/hooks/useModalHandlers";
import useIsAdmin from "../../utils/hooks/useIsAdmin";
import Paginate from "../../components/paginate";

export default function Playgrounds({ areas, currentPage, totalPages }) {
  const router = useRouter();
  const [isModalShown, handleOpenModal, handleCloseModal] = useModalHandlers();
  const { isAdmin } = useIsAdmin();

  const handleNextPage = (e) => {
    const page = e.selected + 1;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    });
  };

  return (
    <div className={s.background}>
      <section className={s.courts}>
        <Grid>
          <Filters areas={areas} router={router} />
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
          <div className={s.pagination}>
            <Paginate
              currentPage={currentPage}
              pageCount={totalPages}
              handleCurrentPage={handleNextPage}
            />
          </div>
        </Grid>
      </section>
      <AdminPlaygroundModal visible={isModalShown} onClose={handleCloseModal} />
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const {
      page = 1,
      purposeOfAreas = null,
      districts = null,
      rating = null,
    } = context.query;
    const limit = 20;

    const url = new URL(`${process.env.NEXT_PUBLIC_HOST}api/areas/all`);

    url.searchParams.set("page", page);
    url.searchParams.set("limit", limit);
    if (purposeOfAreas) url.searchParams.set("purposeOfAreas", purposeOfAreas);
    if (districts) url.searchParams.set("districts", districts);
    if (rating) url.searchParams.set("rating", rating);

    const AreasResponse = await fetch(url.toString());

    const data = await AreasResponse.json();

    return {
      props: {
        ...data,
      },
    };
  } catch (error) {
    throw new Error(`Problem fetch page content ${error}`);
  }
}
