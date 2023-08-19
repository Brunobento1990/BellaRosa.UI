import { useRouter } from 'next/router';

export function useAuthApp(){

    const router = useRouter();

    function getSessionInfo(){
        return JSON.parse(localStorage.getItem('sessionInfo'))
    }

    function clearLocalStorage(){
        localStorage.clear();
    }

    function setSessionInfo(contextApp){
        
        if(!contextApp){
            router
          .replace({
            pathname: '/auth/login',
            query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
          })
         .catch(console.error);
        }

        if(contextApp === undefined){
            return;
        }

        localStorage.setItem('token', contextApp.token)
        localStorage.setItem('sessionInfo', JSON.stringify(contextApp.sessionInfo))

        router.push('/');
    }

    function authorize(){
        const token = localStorage.getItem("token");
        const sessionInfo = localStorage.getItem("sessionInfo");

        if(!token || !sessionInfo){
            return false;
        }

        return true;
    }

    return {
        setSessionInfo,
        authorize,
        getSessionInfo,
        clearLocalStorage,
    }
}