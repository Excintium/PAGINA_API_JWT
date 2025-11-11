import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card, Typography } from 'antd';
import { useAuth } from '../../contexts/AuthContext';

const { Title } = Typography;

export function RegisterForm() {
    const { register, isLoading } = useAuth();

    const onFinish = async (values: any) => {
        try {
            await register(values);
        } catch (error) {
            console.error('Error al registrar:', error);
        }
    };

    return (
        <Card style={{ width: 400, margin: 'auto' }}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
                Crear Cuenta
            </Title>

            <Form name="register" onFinish={onFinish} layout="vertical">
                <Form.Item
                    name="name"
                    label="Nombre"
                    rules={[
                        { required: true, message: 'Por favor ingresa tu nombre' },
                        { min: 2, message: 'El nombre debe tener al menos 2 caracteres' },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Tu nombre"
                        size="large"
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Correo electrónico"
                    rules={[
                        { required: true, message: 'Por favor ingresa tu correo electrónico' },
                        { type: 'email', message: 'El correo no es válido' },
                    ]}
                >
                    <Input
                        prefix={<MailOutlined />}
                        placeholder="ejemplo@correo.cl"
                        size="large"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Contraseña"
                    rules={[
                        { required: true, message: 'Por favor ingresa una contraseña' },
                        { min: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Contraseña"
                        size="large"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                        loading={isLoading}
                    >
                        {isLoading ? 'Creando cuenta...' : 'Registrarse'}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}
