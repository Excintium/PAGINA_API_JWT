import React from 'react';
import { ConfigProvider, Layout, theme } from 'antd'; // Sin cambios aquí
import { AppHeader } from '../organisms/AppHeader';

const { Content } = Layout;

interface MainLayoutProps {
    children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <ConfigProvider
            theme={{
                // 1. Mantenemos el algoritmo oscuro para que maneje las letras,
                //    estados hover, etc.
                algorithm: theme.darkAlgorithm,

                // 2. Sobrescribimos los colores (tokens) con nuestra paleta
                token: {
                    colorPrimary: '#00B8D4',     // Color de acento (Botones)
                    colorLink: '#00B8D4',        // Color de enlaces (Editar/Eliminar)
                    colorBgLayout: '#1f1f1f',    // Fondo de la página (Content)
                    colorBgContainer: '#2b2b2b', // Fondo de Header y Tarjeta de productos
                },
            }}
        >
            <Layout style={{ minHeight: '100vh' }}>
                <AppHeader />
                
                <Content style={{ padding: '24px' }}>
                    {children}
                </Content>
            </Layout>
        </ConfigProvider>
    );
}