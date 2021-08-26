import Checkbox from "../components/Checkbox";
import { useState } from 'react';

export default function Home() {
    const [chec1, set1] = useState(false)
    const [chec2, set2] = useState(false)
    const [chec3, set3] = useState(false)
    const [chec4, set4] = useState(false)
    const [chec5, set5] = useState(false)
    return (
        <>
            <Checkbox changeState={set1} state={chec1} text={"Спортивний"} />
            <Checkbox changeState={set2} state={chec2} text={"Дитячий"} />
            <Checkbox changeState={set3} state={chec3} />
            <Checkbox changeState={set4} state={chec4} text={"Скейт-майданчик"} />
            <Checkbox changeState={set5} state={chec5} text={"Баскетбольний"} />
        </>
    );
  }
  