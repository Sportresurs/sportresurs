import s from "./EditAdminForm.module.scss";
import Input from "../Input/Input";
import Button from "../Button";

export default function EditAdminForm({
  value,
  handleSubmit,
  handleChange,
  handleSave,
  adminId,
}) {
  return (
    <form className={s.editForm} onSubmit={handleSubmit}>
      <Input
        className={s.editInput}
        type="text"
        value={value}
        onChange={handleChange}
      />
      <Button
        variant="black"
        size="small"
        className={s.saveBtn}
        type="submit"
        onClick={() => handleSave(adminId)}
      >
        Зберегти
      </Button>
    </form>
  );
}
