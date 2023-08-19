import axios from "axios";
import { useLoader } from '../components/loading/index'
import { useRouter } from 'next/navigation';

function getSocket() {
    //const baseUrl = "https://localhost:44345/api/"
    const baseUrl = "https://api-server.shop/api/"
    const localAuth = localStorage.getItem('token');
    const auth = localAuth ? localAuth : '';

    return axios.create({
        baseURL: baseUrl,
        headers: {
            Authorization: `Bearer ${auth}`
        }
    })
}

export function useApi() {

    const loader = useLoader();
    const router = useRouter();

    async function login(payload) {

        try {

            loader.show();

            const api = getSocket();
            const response = (await api.post("login-cliente", payload)).data;
            //sessionInfo.setSessionInfo(response);
            router.push('/');

        } catch (error) {
            if (error.response) {
                alert(error.response.data)
            } else {
                alert("Ocorreu um erro interno, tente novamente mais tarde.")
            }
        } finally {
            loader.hide();
        }
    }

    async function createUser(payload) {
        try {

            loader.show();

            const api = getSocket();
            const response = (await api.post("adicionar-cliente", payload)).data;
            //sessionInfo.setSessionInfo(response);
            navigate('/home')

        } catch (error) {
            if (error.response) {
                //Modal.show(error.response.data)
                alert(error.response)
            } else {
                //Modal.show("Ocorreu um erro interno, tente novamente mais tarde.")
                alert("Ocorreu um erro interno, tente novamente mais tarde.")
            }
        } finally {
            loader.hide();
        }
    }

    async function get(url) {
        try {

            loader.show();

            const api = getSocket();
            const response = (await api.get(url)).data;
            return response;

        } catch (error) {
            if (error.response) {
                //Modal.show(error.response.data)
                alert(error.response)
            } else {
                //Modal.show("Ocorreu um erro interno, tente novamente mais tarde.")
                alert("Ocorreu um erro interno, tente novamente mais tarde.")
            }
        } finally {
            loader.hide();
        }
    }

    return {
        login,
        createUser,
        get
    }

}