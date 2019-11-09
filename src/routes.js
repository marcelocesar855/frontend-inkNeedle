import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import RecuSenha from './pages/RecuSenha';
import CadastroEstudio from './pages/CadastroEstudio';
import CadastroEvento from './pages/CadastroEvento';
import RedefSenha from './pages/RedefSenha';
import PerfilTatuador from './pages/PerfilTatuador';
import PerfilEstudio from './pages/PerfilEstudio';
import Agenda from './pages/Agenda';
import Busca from './pages/Busca';

var routes = [
    {
        path: "/busca",
        name: "Busca",
        component: Busca,
        isAuth: 2,
        notPath: "/perfil_tatuador"
    },
    {
        path: "/perfil_tatuador",
        name: "PerfilTatuador",
        component: PerfilTatuador,
        isAuth: 1,
        notPath: "/busca"
      },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
  ];
  export default routes;