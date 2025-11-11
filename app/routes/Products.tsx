import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { message, Modal, Spin } from 'antd';

// --- IMPORTACIONES CORREGIDAS (usando alias '~' y PascalCase) ---
// Usamos el alias '~/' que definiste en tsconfig.json
// y respetamos tu convención PascalCase para los nombres de archivo.

import { ProductList } from '~/components/organisms/ProductList';
import { MainLayout } from '~/components/templates/MainLayout';
import { ProductForm } from '~/components/organisms/ProductForm';
import type { Product } from '~/Types'; // <-- Corregido a PascalCase
import { useAuth } from '~/contexts/AuthContext';
import apiClient from '~/api/Client'; // <-- Corregido a PascalCase

// --- FIN IMPORTACIONES ---

export function meta() {
    return [
        { title: "Dashboard de Productos" },
        { name: "description", content: "Administración de productos" },
    ];
}

export default function ProductsPage() {
    // 1. HOOKS
    const { token } = useAuth(); // Quitamos 'logout' que no se usa aquí
    const navigate = useNavigate();

    // 2. ESTADOS
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Carga inicial
    const [isModalLoading, setIsModalLoading] = useState(false); // Carga del formulario
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // --- 3. DEFINICIÓN DE FUNCIONES ---
    // (Definimos las funciones aquí, ANTES de los useEffect)

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            // Usamos el endpoint '/productos' de tu API
            const response = await apiClient.get('/productos');
            setProducts(response.data);
        } catch (error: any) {
            message.error('Error al cargar productos: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: '¿Estás seguro de eliminar este producto?',
            content: 'Esta acción no se puede deshacer.',
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: async () => {
                try {
                    await apiClient.delete(`/productos/${id}`);
                    message.success('Producto eliminado');
                    fetchProducts(); // Recarga la lista
                } catch (error: any) {
                    message.error('Error al eliminar: ' + error.message);
                }
            },
        });
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleFormSubmit = async (values: { nombre: string; precio: number; stock: number; description: string }) => {
        setIsModalLoading(true);
        try {
            if (editingProduct) {
                await apiClient.put(`/productos/${editingProduct.id}`, values);
                message.success('Producto actualizado');
            } else {
                await apiClient.post('/productos', values);
                message.success('Producto creado');
            }
            setIsModalOpen(false);
            setEditingProduct(null);
            fetchProducts(); // Recarga la lista
        } catch (error: any) {
            message.error('Error al guardar el producto: ' + error.message);
        } finally {
            setIsModalLoading(false);
        }
    };

    // --- 4. EFECTOS (useEffect) ---
    // (Ahora los 'useEffect' pueden encontrar las funciones de arriba)

    // Protección de la ruta
    useEffect(() => {
        if (!token) {
            message.warning('Debes iniciar sesión para ver esta página');
            navigate('/');
        }
    }, [token, navigate]);

    // Carga inicial de datos
    useEffect(() => {
        if (token) {
            fetchProducts(); // <-- El error desaparece
        }
    }, [token]);


    // --- 5. RENDERIZADO ---

    if (!token) {
        return null; // No renderiza nada, el useEffect ya está redirigiendo
    }

    if (isLoading) {
        return (
            <MainLayout>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <Spin size="large" />
                </div>
            </MainLayout>
        );
    }

    // Todos los imports (ProductList, MainLayout, ProductForm, Modal, Spin) se usan aquí
    return (
        <MainLayout>
            <ProductList
                products={products}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <ProductForm
                open={isModalOpen}
                loading={isModalLoading}
                product={editingProduct}
                onSubmit={handleFormSubmit}
                onCancel={handleModalCancel}
            />
        </MainLayout>
    );
}