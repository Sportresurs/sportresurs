import s from "./AddAdminForm.module.scss";
import Input from "../Input/Input";
import Button from "../Button";

export default function AddAdminForm({ value, handleSubmit, handleChange }) {
  return (
    <>
      <div className={s.textContainer}>
        <p className={s.title}>Електронна пошта</p>
      </div>
      <form className={s.form} onSubmit={handleSubmit}>
        <Input
          className={s.input}
          type="text"
          value={value}
          onChange={handleChange}
        />
        <Button variant="lilac" size="small" type="submit">
          Додати
        </Button>
      </form>
    </>
  );
}
