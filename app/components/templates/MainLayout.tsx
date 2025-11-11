import React from 'react';
import { ConfigProvider, Layout, theme } from 'antd';
import { AppHeader } from '../organisms/AppHeader';

const { Content } = Layout;

interface MainLayoutProps {
    children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#00B8D4',
                    colorLink: '#00B8D4',
                    colorBgLayout: '#1f1f1f',
                    colorBgContainer: '#2b2b2b',
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