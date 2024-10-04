const OPTIONS = {
  access: [
    { label: "Безкоштовний", value: "безкоштовний" },
    { label: "Платний", value: "платний" },
  ],
  ownership_form: [
    { label: "Не обрано", value: null },
    { label: "Шкільна", value: "Шкільна" },
    { label: "Приватна", value: "Приватна" },
    { label: "Комунальна", value: "Комунальна" },
  ],
  inclusiveness: [
    { label: "Не обрано", value: null },
    { label: "Інклюзивний", value: "Інклюзивний" },
    { label: "З елементами інклюзії", value: "З елементами інклюзії" },
    { label: "Не інклюзивний", value: "Не інклюзивний" },
  ],
  light: [
    { label: "Є", value: true },
    { label: "Відсутнє", value: false },
  ],
};

export default OPTIONS;
