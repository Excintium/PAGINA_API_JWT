import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { message, Modal, Spin } from 'antd';

// Importaciones con las rutas corregidas (PascalCase)
import { ProductList } from '~/components/organisms/ProductList';
import { MainLayout } from '~/components/templates/MainLayout';
import { ProductForm } from '~/components/organisms/ProductForm';
import type { Product } from '~/Types';
import { useAuth } from '~/contexts/AuthContext';
import apiClient from '~/api/Client';

export function meta() {
    return [
        { title: "Dashboard de Productos" },
        { name: "description", content: "Administración de productos" },
    ];
}

export default function ProductsPage() {
    // 1. HOOKS
    const { token } = useAuth();
    const navigate = useNavigate();

    // 2. ESTADOS
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Carga inicial
    const [isModalLoading, setIsModalLoading] = useState(false); // Carga del formulario
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // --- 3. DEFINICIÓN DE FUNCIONES ---

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
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
                    fetchProducts();
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
            fetchProducts();
        } catch (error: any) {
            message.error('Error al guardar el producto: ' + error.message);
        } finally {
            setIsModalLoading(false);
        }
    };

    // --- 4. EFECTOS (useEffect) ---

    useEffect(() => {
        if (!token) {
            message.warning('Debes iniciar sesión para ver esta página');
            navigate('/');
        }
    }, [token, navigate]);

    useEffect(() => {
        if (token) {
            fetchProducts();
        }
    }, [token]);


    // --- 5. RENDERIZADO ---

    if (!token) {
        return null;
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