import { z } from 'zod';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { NextPage } from 'next';
import { Button, Stack, TextInput, PasswordInput, Group, Title, Grid } from '@mantine/core';

import { RoutePath } from 'routes';
import { handleError } from 'utils';
import { Link } from 'components';

import Image from 'next/image';

import { accountApi, accountConstants } from 'resources/account';

const schema = z.object({
  email: z.string().regex(accountConstants.emailRegex, 'Email format is incorrect.'),
  password: z
    .string()
    .regex(
      accountConstants.passwordRegex,
      'The password must contain 8 or more characters, contain at least 1 number, contain lover case and capital letters'
    ),
});

type SignUpParams = z.infer<typeof schema>;

const passwordRules = [
  {
    title: 'Must be at least 8 characters',
    done: false,
  },
  {
    title: 'Must contain at least 1 number',
    done: false,
  },
  {
    title: 'Must contain lover case and capital letters',
    done: false,
  },
];

const SignUp: NextPage = () => {
  const [email, setEmail] = useState('');
  const [registered, setRegistered] = useState(false);
  const [signupToken, setSignupToken] = useState();

  const [passwordRulesData, setPasswordRulesData] = useState(passwordRules);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignUpParams>({
    resolver: zodResolver(schema),
  });

  const passwordValue = watch('password', '');

  useEffect(() => {
    const updatedPasswordRulesData = [...passwordRules];

    updatedPasswordRulesData[0].done = passwordValue.length >= 8 && passwordValue.length <= 50;
    updatedPasswordRulesData[1].done = /[0-9]/.test(passwordValue);
    updatedPasswordRulesData[2].done = /[a-z]/.test(passwordValue) && /[A-Z]/.test(passwordValue);

    setPasswordRulesData(updatedPasswordRulesData);
  }, [passwordValue]);

  const { mutate: signUp, isLoading: isSignUpLoading } = accountApi.useSignUp<SignUpParams>();

  const onSubmit = (data: SignUpParams) =>
    signUp(data, {
      onSuccess: (response: any) => {
        if (response.signupToken) setSignupToken(response.signupToken);

        setRegistered(true);
        setEmail(data.email);
      },
      onError: (e) => handleError(e, setError),
    });

  if (registered) {
    return (
      <>
        <Head>
          <title>Sign up</title>
        </Head>
        <Stack sx={{ width: '450px' }}>
          <Title order={2}>Check your email dear friend!😽</Title>
        </Stack>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <Stack sx={{ width: '408px' }} spacing={20}>
        <Stack spacing={34}>
          <Title order={1}>Sign Up</Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={20}>
              <TextInput
                size="sm"
                radius="md"
                {...register('email')}
                label="Email Address"
                placeholder="Email Address"
                error={errors.email?.message}
                labelProps={{ style: { marginBottom: '8px' } }}
              />
              <PasswordInput
                size="sm"
                radius="md"
                {...register('password')}
                label="Password"
                placeholder="Enter password"
                error={errors.password?.message}
                labelProps={{ style: { marginBottom: '8px' } }}
              />
              <Grid gutter="xs">
                {passwordRules.map(({ title, done }) => (
                  <Grid.Col>
                    <Group>
                      <Image alt="checkout icon" src="../images/check-circle.svg" width={20} height={20} />
                      <div style={{ color: !done ? '#A3A3A3' : 'green' }}>{title}</div>
                    </Group>
                  </Grid.Col>
                ))}
              </Grid>
            </Stack>
            <Button type="submit" loading={isSignUpLoading} fullWidth size="md" radius="md" mt={34}>
              Create Account
            </Button>
          </form>
        </Stack>
        <Stack spacing={34}>
          <Group sx={{ fontSize: '16px', justifyContent: 'center' }} spacing={12}>
            Have an account?
            <Link type="router" href={RoutePath.SignIn} inherit underline={false}>
              Sign In
            </Link>
          </Group>
        </Stack>
      </Stack>
    </>
  );
};

export default SignUp;
