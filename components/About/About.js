import s from "./About.module.scss";

export default function About() {
  return (
    <section>
      <div className={s.container}>
        <div className={s.videoWrapper}>
          <iframe
            width="635"
            height="512"
            src="https://www.youtube.com/embed/FEgNu7ZakOU?showinfo=0"
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