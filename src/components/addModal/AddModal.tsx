import { Button, Form, Input, Modal } from 'antd';
import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  record?: any;
}
export const AddModal = ({ isOpen, onClose, record }: Props) => {
  return (
    <Modal footer={null} title={record ? 'Update ' : 'Create'} open={isOpen} onCancel={onClose}>
      <Form layout="vertical">
        <Form.Item label="Enter full name">
          <Input placeholder="Enter full name" />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea placeholder="Descrption " />
        </Form.Item>
        <Button type="primary" className="w-full" htmlType="submit" >
          {record ? 'Update' : 'Create'}
        </Button>
      </Form>
    </Modal>
  );
};
