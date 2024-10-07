import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./Unbroken.module.scss";
import CourtCard from "../../components/CourtCard";
import Paginate from "../../components/paginate";

export default function Unbroken({ areas, currentPage, totalPages }) {
  const router = useRouter();

  useEffect(() => {
    if (router.query.type !== "Unbroken Sport") {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, type: "Unbroken Sport,Unbroken" },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.type]);

  const handleNextPage = (e) => {
    const page = e.selected + 1;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    });
  };

  return (
    <div className={styles.background}>
      <section className={styles.courts}>
        <ul className={styles.list}>
          {areas.map((court) => (
            <li key={court.id} className={styles.listItem}>
              <CourtCard
                courtInfo={court}
                variant="courtList"
                isModal={false}
              />
            </li>
          ))}
        </ul>{" "}
        <div className={styles.pagination}>
          <Paginate
            currentPage={currentPage}
            pageCount={totalPages}
            handleCurrentPage={handleNextPage}
          />
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const { page = 1, type } = context.query;
    const limit = 20;

    const AreasResponse = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}api/areas/all?page=${page}&limit=${limit}&type=${type}`
    );

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
