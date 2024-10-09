import s from "./About.module.scss";

export default function About() {
  return (
    <section className={s.aboutUs} id="navigateToAboutUs">
      <div className={s.container}>
        <div className={s.videoWrapper}>
          <iframe
            width="635"
            height="512"
            src="https://www.youtube.com/embed/_EbyRCSuQNM"
            title="sportresurs video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className={s.descriptions}>
          <h2 className={s.about}>Про нас</h2>
          <h3 className={s.mission}>
            Наша ціль — доступна спортивна та дитяча інфраструктура для всіх
          </h3>
          <p className={s.text}>
            ЛКП Спортресурс — це будівництво та реконструкція спортивної
            інфраструктури, а також якісна та своєчасна підтримка спортивних
            подій. Ми сприяємо розвитку масового та професійного спорту,
            гармонійному розвитку людей та формуванню здорового способу життя.
          </p>
        </div>
      </div>
    </section>
  );
}
