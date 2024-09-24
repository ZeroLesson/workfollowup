"use client";
import { useRef, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';

export default function LoginPage() {
    const username = useRef(null);
    const password = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const { data: session } = useSession(); // Now this should work properly as long as the component is inside <SessionProvider>

    const handleLogin = async () => {
        setErrorMessage(null);

        if (!username.current?.value || !password.current?.value) {
            setErrorMessage('Please fill out both fields.');
            return;
        }

        const res = await signIn("credentials", {
            username: username.current.value,
            password: password.current.value,
            redirect: false,
            callbackUrl: '/'
        });

        if (res?.error) {
            setErrorMessage('Invalid username or password.');
        } else {
            window.location.href = res.url || '/';
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(180deg, #e0f2f1, #a5d6a7)'
            }}
        >
            <Container maxWidth="xs">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        padding: 3,
                        borderRadius: 2,
                        boxShadow: 3
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Login
                    </Typography>

                    {errorMessage && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            {errorMessage}
                        </Alert>
                    )}

                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            name="username"
                            type="text"
                            inputRef={username}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            inputRef={password}
                            onKeyDown={(e) => {
                                if (e.key === "Enter")
                                    handleLogin();
                            }}
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
