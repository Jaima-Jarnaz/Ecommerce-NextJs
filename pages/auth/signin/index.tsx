import Input from "../../../components/atoms/input";
import Container from "../../../components/atoms/container";
const Signin = () => {
  return (
    <Container width="400" display="flex">
      <h3>Sign In</h3>
      <Input type="email" label="Email" />
      <Input type="password" label="Password" />
    </Container>
  );
};

export default Signin;
