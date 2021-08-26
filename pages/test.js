import Input from '../components/Input.jsx';

const Test = () => {
  return (
    <>
      <Input /><br />
      <Input label={'label-2'} type="active" placeholder="label-2" /><br />
      <Input label={'some text'} isError={true} type="active" placeholder="some text" />
    </>
  )
};

export default Test;