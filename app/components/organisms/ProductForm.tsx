import { Modal, Form, Input, InputNumber, message } from 'antd';
import { useEffect } from 'react';
import type { Product } from '~/Types';

interface ProductFormProps {
    open: boolean;
    loading: boolean;
    product: Product | null;
    onSubmit: (values: { nombre: string; precio: number; stock: number; description: string }) => void;
    onCancel: () => void;
}

export function ProductForm({ open, loading, product, onSubmit, onCancel }: ProductFormProps) {
    const [form] = Form.useForm();

    const title = product ? 'Editar Producto' : 'Añadir Nuevo Producto';

    useEffect(() => {
        if (open) {
            if (product) {
                form.setFieldsValue(product);
            } else {
                form.resetFields();
            }
        }
    }, [product, open, form]);

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                onSubmit(values as any);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
                message.error('Por favor completa todos los campos');
            });
    };

    return (
        <Modal
            open={open}
            title={title}
            okText={product ? 'Actualizar' : 'Crear'}
            cancelText="Cancelar"
            onCancel={onCancel}
            onOk={handleOk}
            confirmLoading={loading}
            forceRender
        >
            <Form form={form} layout="vertical" name="product_form">
                <Form.Item
                    name="nombre"
                    label="Nombre del Producto"
                    rules={[{ required: true, message: 'El nombre es obligatorio' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="precio"
                    label="Precio"
                    rules={[{ required: true, message: 'El precio es obligatorio' }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        prefix="$"
                        min={0}
                        step={100}
                    />
                </Form.Item>

                <Form.Item
                    name="stock"
                    label="Stock"
                    rules={[{ required: true, message: 'El stock es obligatorio' }]}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        step={1}
                    />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Descripción"
                    rules={[{ required: true, message: 'La descripción es obligatoria' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
}