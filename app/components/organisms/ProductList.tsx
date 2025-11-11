import { List, Button, Typography, Card, Space, Tag } from 'antd';
import type { Product } from '~/Types';

interface ProductListProps {
    products: Product[];
    onAdd: () => void;
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

export function ProductList({ products, onAdd, onEdit, onDelete }: ProductListProps) {
    return (
        <Card
            title="Listado de Productos"
            extra={
                <Button type="primary" onClick={onAdd}>
                    Añadir Producto
                </Button>
            }
        >
            <List
                itemLayout="horizontal"
                dataSource={products}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button type="link" onClick={() => onEdit(item)}>
                                Editar
                            </Button>,
                            <Button type="link" danger onClick={() => onDelete(item.id)}>
                                Eliminar
                            </Button>,
                        ]}
                    >
                        <List.Item.Meta
                            // --- CORRECCIÓN AQUÍ ---
                            title={<Typography.Text>{item.nombre}</Typography.Text>}
                            description={
                                <>
                                    <div>{item.description}</div>
                                    <Space style={{ marginTop: 8 }}>
                                        <Tag color="cyan">
                                            Precio: ${item.precio.toLocaleString('es-CL')}
                                        </Tag>
                                        <Tag color="geekblue">
                                            Stock: {item.stock}
                                        </Tag>
                                    </Space>
                                </>
                            }
                            // --- FIN DE LA CORRECCIÓN ---
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
}