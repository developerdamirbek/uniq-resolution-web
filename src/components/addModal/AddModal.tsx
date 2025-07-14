// src/components/addModal/AddModal.tsx

import { Button, Form, Input, Modal } from 'antd';
import { useCreateSkill } from '../../pages/Skills/services/mutation/useCreateSkill';
import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  record?: any | null;
}

// interface FormValues {
//   name: string;
//   description: string;
// }

export const AddModal = ({ isOpen, onClose, record }: Props) => {
  const [form] = Form.useForm();
  const { mutate } = useCreateSkill();

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

  const handleSubmit = (values: any) => {
    mutate(values, {
      onSuccess: () => {
        console.log('Skill created');
        onClose();
        form.resetFields();
      },
      onError: (error) => {
        console.error('Error creating skill:', error);
      },
    });
  };

  return (
    <Modal
      footer={null}
      title={record ? 'Update Skill' : 'Create Skill'}
      open={isOpen}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter a name' }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <Input.TextArea placeholder="Enter description" />
        </Form.Item>
        <Button type="primary" className="w-full" htmlType="submit">
          {record ? 'Update' : 'Create'}
        </Button>
      </Form>
    </Modal>
  );
};
