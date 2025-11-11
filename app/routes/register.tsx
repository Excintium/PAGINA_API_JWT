import { MainLayout } from '../components/templates/MainLayout';
import { RegisterForm } from '../components/molecules/RegisterForm';

export default function RegisterPage() {
    return (
        <MainLayout>
            <RegisterForm />
        </MainLayout>
    );
}

export function meta() {
    return [
        { title: 'Crear cuenta' },
        { name: 'description', content: 'Formulario de registro de usuarios' },
    ];
}
