import { Button, Layout, theme } from 'antd';
import { useAuth } from '~/contexts/AuthContext'; // <-- Importa el hook

const { Header } = Layout;

export function AppHeader() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { logout } = useAuth(); // <-- Obtiene la función de logout

    return (
        <Header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: colorBgContainer,
            padding: '0 24px'
        }}>
            <div>
                Logo (o Título)
            </div>

            {/* Botón de Logout */}
            <Button type="default" danger onClick={logout}>
                Cerrar Sesión
            </Button>
        </Header>
    );
}