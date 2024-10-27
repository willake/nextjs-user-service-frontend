import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { AxiosError } from 'axios';

export default function useAuthEndpoints() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const login = async (username: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/api/v1/auth/login', {
                username: username,
                password: password,
            });
            const { userId, accessToken } = response.data;

            localStorage.setItem('jwt-token', accessToken);

            router.push('/profile');
        } catch (err) {
            const error = err as AxiosError;
            setError(error.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };
}
