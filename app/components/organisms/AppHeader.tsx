import { Layout, theme } from 'antd';

const { Header } = Layout;

export function AppHeader() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

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
            {/* --- BOTÓN ELIMINADO DE AQUÍ --- */}
        </Header>
    );
}