import { Row, Col } from 'antd';
import { LoginForm } from '~/components/molecules/LoginForm';

// Metadata de la ruta (puedes cambiarla)
export function meta() {
    return [
        { title: "Login" },
        { name: "description", content: "Página de inicio de sesión" },
    ];
}

// Esta es la página de Login
export default function LoginPage() {
    return (
        <Row
            justify="center"
            align="middle"
            style={{ minHeight: '100vh', background: '#f0f2f5' }}
        >
            <Col>
                <LoginForm />
            </Col>
        </Row>
    );
}