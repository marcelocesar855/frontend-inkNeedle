import Home from './pages/Home/index';
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

// 

import StoreStudio from './pages/Studio/store';

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
    {
      path: "/cadastro_usuario",
      name: "CadastroUsuario",
      component: Cadastro
    },
    {
      path: "/cadastro_evento",
      name: "CadastroEvento",
      component: CadastroEvento
    },
    {
      path: "/recuperar_senha/:token",
      name: "RecuSenha",
      component: RedefSenha
    },
    {
      path: "/cadastro_estudio",
      name: "CadastroEstudio",
      component: CadastroEstudio
    },
    {
      path: "/cadasta-estudio",
      name: "Cadastra Estudio",
      component: StoreStudio,
      isAuth: 1,
      notPath: "/busca"
    },
    {
      path: "/redef_senha/",
      name: "RedefSenha",
      component: RecuSenha
    },
    {
      path: "/perfil_estudio",
      name: "PerfilEstudio",
      component: PerfilEstudio
    },
    {
      path: "/agenda",
      name: "Agenda",
      component: Agenda,
      isAuth : 1,
      notPath: "/busca"
    },
    {
      path: "/",
      name: "Home",
      component: Home
    }
  ];
export default routes;