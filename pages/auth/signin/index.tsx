import Input from "@/components/atoms/input";
import Container from "@/components/atoms/container";
import Heading from "@/components/atoms/heading";

const Signin = () => {
  return (
    <Container width="400" margin="middle" type="shadow" padding="30">
      <Container>
        <Heading tag="h4">Sign In</Heading>
      </Container>
      <Input type="email" label="Email" />
      <Input type="password" label="Password" />
    </Container>
  );
};

export default Signin;
