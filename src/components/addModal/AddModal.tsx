import { Button, Form, Input, Modal } from 'antd';
import { useCreateSkill } from '../../pages/Skills/services/mutation/useCreateSkill';
import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  record?: any | null;
}
export const AddModal = ({ isOpen, onClose, record }: Props) => {
  const [form] = Form.useForm();

  const { mutate, isPending } = useCreateSkill();

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        name: record.skill?.name || '',
        description: record.skill?.description || '',
      });
    } else {
      form.resetFields();
    }
  }, [record, form]);

  const handleSubmit = (values) => {
    mutate(values, {
      onSuccess: () => {
        console.log('created');
      },
    });
  };

  return (
    <Modal footer={null} title={record ? 'Update ' : 'Create'} open={isOpen} onCancel={onClose}>
      <Form onFinish={handleSubmit} form={form} layout="vertical">
        <Form.Item name="name" label="Name">
          <Input placeholder="Entername" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Descrption " />
        </Form.Item>
        <Button type="primary" className="w-full" htmlType="submit">
          {record ? 'Update' : 'Create'}
        </Button>
      </Form>
    </Modal>
  );
};
