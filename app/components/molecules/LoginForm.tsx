import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Card, Typography } from 'antd';
import { useNavigate } from 'react-router';

const { Title } = Typography;

export function LoginForm() {
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        // Aquí iría tu lógica de autenticación JWT
        // Por ahora, solo navegamos a la página de productos
        navigate('/products');
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
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '¡Por favor ingresa tu usuario!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Usuario" />
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
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Ingresar
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}