import axios from "axios";
import { useLoader } from '../components/loading/index'
import { useRouter } from 'next/navigation';
import { useAuthApp } from "src/guards/auth-app";

function getSocket() {
    //const baseUrl = "https://localhost:44345/api/"
    const baseUrl = "https://api-server.shop/api/"
    const localAuth = localStorage.getItem('token');
    const auth = localAuth ? localAuth : '';

    return axios.create({
        baseURL: baseUrl,
        headers: {
            Authorization: `Bearer ${auth}`,
            apiKey: "236d98fc-45be-4282-8b6f-ff906e17e68c"
        }
    })
}

export function useApi() {

    const loader = useLoader();
    const router = useRouter();
    const authApp = useAuthApp();

    async function login(payload) {
        try {
            loader.show();

            const api = getSocket();
            const response = (await api.post("login-cliente", payload)).data;
            authApp.setSessionInfo(response);

        } catch (error) {
            router.push("/404")
        } finally {
            loader.hide();
        }
    }

    async function createUser(payload) {
        try {
            loader.show();
            const api = getSocket();
            const response = (await api.post("adicionar-cliente", payload)).data;
            authApp.setSessionInfo(response);

        } catch (error) {
            router.push("/404")
        } finally {
            loader.hide();
        }
    }

    async function get(url) {
        try {

            if (!authApp.authorize()) {
                router
                    .replace({
                        pathname: '/auth/login',
                        query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
                    })
                    .catch(console.error);
            }

            loader.show();

            const api = getSocket();
            const response = (await api.get(url)).data;
            return response;

        } catch (error) {
            router.push("/404")
        } finally {
            loader.hide();
        }
    }

    async function put(url, payload){
        try {

            if (!authApp.authorize()) {
                router
                    .replace({
                        pathname: '/auth/login',
                        query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
                    })
                    .catch(console.error);
            }

            loader.show();

            const api = getSocket();
            const response = (await api.put(url, payload)).data;
            return response;

        } catch (error) {
            router.push("/404")
        } finally {
            loader.hide();
        }
    }

    return {
        login,
        createUser,
        get,
        put
    }

}