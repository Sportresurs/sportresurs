import { useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import s from "./About.module.scss";
import useWindowSize from "../../utils/hooks/findWindowSize";
import setHeightOfHeader from "../../utils/findHeightOfHeader";

export default function About() {
  const size = useWindowSize();
  const router = useRouter();

  const heightOfHeader = useMemo(() => setHeightOfHeader(size.width), [size]);

  useEffect(() => {
    if (router && router.asPath) {
      const anchor = document.getElementById(router.asPath.slice(2));
      if (anchor) {
        const y =
          anchor.getBoundingClientRect().top +
          window.pageYOffset +
          heightOfHeader;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [router, heightOfHeader]);

  return (
    <section className={s.aboutUs} id="navigateToAboutUs">
      <div className={s.container}>
        <div className={s.videoWrapper}>
          <iframe
            width="635"
            height="512"
            src="https://www.youtube.com/embed/FEgNu7ZakOU"
            title="sportresurs video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className={s.descriptions}>
          <h2 className={s.about}>Про нас</h2>
          <h3 className={s.mission}>
            Наша ціль - доступні майданчики для всіх
          </h3>
          <p className={s.text}>
            Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam
            no suscipit quaerendum. At nam minimum ponderum. Est audiam animal
            molestiae te. Ex duo eripuit mentitum.
          </p>
        </div>
      </div>
    </section>
  );
}
