import { jwtVerify, importJWK } from 'jose';
import { useAuthStore } from "../common/store/authStore";
import { useState, useEffect } from 'react';

const SECRET_KEY = new TextEncoder().encode(import.meta.env.VITE_SECRET_KEY);

export const useToken = () => {
    const token = useAuthStore((state) => state.token);

    const [isLoading, setIsLoading] = useState(true);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [tokenPayload, setTokenPayload] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const { payload } = await jwtVerify(token, SECRET_KEY);
                setTokenPayload(payload);
                setIsTokenValid(true);
            } catch (err) {
                setError(err);
                setIsTokenValid(false);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) {
            verifyToken();
        } else {
            setIsLoading(false);
            setIsTokenValid(false);
        }
    }, [token]);

    return {
        isLoading,
        isTokenValid,
        tokenPayload,
        error
    };
};
