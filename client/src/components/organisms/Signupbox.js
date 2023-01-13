import { useState } from 'react';
import styled from 'styled-components';
import { INVALIDEMAIL, INVALIDPASSWORD } from '../../constants/Messages';
import { isValidEmail, isValidPassword } from '../../functions/isValid';
import { LabelListTitle } from '../../styles/typo';
import { BlackShadowButton } from '../atoms/Buttons';
import InputCard from '../molecules/InputCard';
import { LoginMessage } from '../molecules/SignUpMessage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 400px;
  justify-content: center;
  align-items: center;
`;

const SignupInput = ({ height, type, placeholder, onChange, message, asideInput }) => {
  return (
    <InputCard
      width="512px"
      height={height}
      boxShadow="var(--boxShadow-00) black"
      type={'' || type}
      placeholder={placeholder}
      inputWidth="100%"
      inputHeight="20px"
      onChange={onChange}
      asideInput={asideInput}
      message={message}
      messageColor="red"
    />
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

const Label = styled.div`
  width: 100%;
  margin-bottom: 5px;
  ${LabelListTitle}
`;

const Signupbox = () => {
  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const onEmailInput = e => {
    const emailValue = e.target.value;

    setEmail(emailValue);

    if (isValidEmail(emailValue) || emailValue.length === 0) {
      setEmailMessage('');
    } else {
      setEmailMessage(INVALIDEMAIL);
    }
  };

  const onPasswordInput = e => {
    const passwordValue = e.target.value;

    setPassword(passwordValue);

    if (isValidPassword(passwordValue) || passwordValue.length === 0) {
      setPasswordMessage('');
    } else {
      setPasswordMessage(INVALIDPASSWORD);
    }
  };

  const onLoginClick = () => {
    if (!email || !password || emailMessage || passwordMessage) {
      return;
    }

    console.log(email);
    console.log(password);
  };

  return (
    <Container>
      <Box>
        <Label>Email</Label>
        <SignupInput placeholder="Enter Your Email" onChange={onEmailInput} message={emailMessage} />
      </Box>
      <Box>
        <Label>Password</Label>
        <SignupInput
          type="password"
          placeholder="Enter Your Password"
          onChange={onPasswordInput}
          message={passwordMessage}
        />
      </Box>
      <Box>
        <BlackShadowButton width="512px" onClick={onLoginClick}>
          Sign Up
        </BlackShadowButton>
        <LoginMessage />
      </Box>
    </Container>
  );
};

export default Signupbox;
