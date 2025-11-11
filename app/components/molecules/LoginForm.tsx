import { LockOutlined, MailOutlined } from '@ant-design/icons'; // <-- Cambiado
import { Button, Checkbox, Form, Input, Card, Typography } from 'antd';
import { useAuth } from '~/contexts/AuthContext'; // <-- Importa el hook de Auth

const { Title } = Typography;

export function LoginForm() {
    const { login, isLoading } = useAuth(); // <-- Usa el hook

    const onFinish = async (values: any) => {
        try {
            // Llama a la función 'login' de AuthContext
            await login(values);
        } catch (error) {
            // El contexto ya mostró el mensaje de error
            console.log('Error capturado por el formulario');
        }
    };

    return (
        <Card style={{ width: 400, margin: 'auto' }}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
                Iniciar Sesión
            </Title>
            <Form
                name="normal_login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                {/* Cambiado a 'email' */}
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: '¡Por favor ingresa tu email!' },
                        { type: 'email', message: '¡Email no válido!' }
                    ]}
                >
                    <Input
                        prefix={<MailOutlined />} // Icono cambiado
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '¡Por favor ingresa tu contraseña!' }]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Contraseña"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Recordarme</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    {/* Botón con estado de carga */}
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                        loading={isLoading}
                    >
                        {isLoading ? 'Ingresando...' : 'Ingresar'}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}