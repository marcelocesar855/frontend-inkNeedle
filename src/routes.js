import Home from './pages/Home/index';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import RecuSenha from './pages/RecuSenha';
import CadastroEstudio from './pages/CadastroEstudio';
import CadastroEvento from './pages/CadastroEvento';
import RedefSenha from './pages/RedefSenha';
import PerfilTatuador from './pages/PerfilTatuador';
import PerfilTatuadorClienteView from './pages/PerfilTatuadorClienteView';
import PerfilEstudioClienteView from './pages/PerfilEstudioViewCliente';
import PerfilEstudio from './pages/PerfilEstudio';
import Agenda from './pages/Agenda';
import AgendaCliente from './pages/AgendaCliente';
import EditarPerfil from './pages/EditarPerfil';
import Busca from './pages/Busca';

import StoreStudio from './pages/Studio/store';

var routes = [      
    {
        path: "/busca",
        name: "Busca",
        component: Busca,
        isAuth: 2,
        notPath: "/meu_perfil"
    },
    {
        path: "/meu_perfil",
        name: "PerfilTatuador",
        component: PerfilTatuador,
        isAuth: 1,
        notPath: "/busca"
      },
      {
          path: "/perfil_tatuador/:id",
          name: "PerfilTatuadorClienteView",
          component: PerfilTatuadorClienteView,
          isAuth: 2,
          notPath: "/meu_perfil"
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
      path: "/meu_estudio/:studioId",
      name: "PerfilEstudio",
      component: PerfilEstudio,
      isAuth: 1,
      notPath: "/busca"
    },
    {
      path: "/perfil_estudio/:studioId",
      name: "PerfilEstudioClienteView",
      component: PerfilEstudioClienteView,
    },
    {
      path: "/agenda",
      name: "Agenda",
      component: Agenda,
      isAuth : 1,
      notPath: "/busca"
    },
    {
      path: "/agenda_cliente",
      name: "AgendaCliente",
      component: AgendaCliente,
      isAuth : 2,
      notPath: "/busca"
    },
    {
      path: "/editar_perfil",
      name: "EditarPerfil",
      component: EditarPerfil,
      isAuth : 1,
      notPath: "/busca"
    },
    {
      path: "/editar_perfil",
      name: "EditarPerfil",
      component: EditarPerfil,
      isAuth : 2,
      notPath: "/busca"
    },
    {
      path: "/",
      name: "Home",
      component: Home
    }
  ];
export default routes;
