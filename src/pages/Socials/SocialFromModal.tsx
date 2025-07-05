import { Button, Form, Input, message, Modal } from 'antd';
import { useCreateSocials } from './service/mutation/useCreateSocials';
import { useEffect } from 'react';
import { useUpdataSocials } from './service/mutation/useUpdataSocials';

interface SocialFromModalProps {
  open: boolean;
  onClose: () => void;
  record?: { id: number; name: string; link: string } | null;
  refetch: () => void;
}

export const SocialFromModal = ({ open, onClose, refetch, record }: SocialFromModalProps) => {
  const [form] = Form.useForm();

  const { mutate: create, isPending: isCreating } = useCreateSocials();
  const { mutate: update, isPending: isUpdate } = useUpdataSocials();

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        name: record.name,
        link: record.link,
      });
    } else {
      form.resetFields();
    }
  }, [record, form]);

  const handelSubmit = (values: { name: string; link: string }) => {
    if (record) {
      update(
        {
          id: record.id,
          name: values.name,
          link: values.link,
        },
        {
          onSuccess: () => {
            refetch();
            form.resetFields();
            onClose();
            message.success('Social create sucsessfully!');
          },
          onError: () => {
            message.error('Something went wrong!');
          },
        }
      );
    } else {
      create(values, {
        onSuccess: () => {
          refetch();
          form.resetFields();
          onClose();
          message.success('Social create sucsessfully!');
        },
        onError: () => {
          message.error('Something went wrong!');
        },
      });
    }
  };

  return (
    <Modal
      footer={null}
      open={open}
      onCancel={onClose}
      title={record ? 'Update Social' : 'Create Social'}
    >
      <Form onFinish={handelSubmit} layout="vertical" form={form}>
        <Form.Item
          label="Name"
          required //required  majburib qi9lib berdi
          name="name"
          rules={[{ required: true, message: 'Please Enter Your Name!' }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          name="link"
          label="Link"
          required
          rules={[{ required: true, message: 'Please Enter Your Link!' }]}
        >
          <Input placeholder="Enter link" />
        </Form.Item>
        <Form.Item>
          <Button loading={isCreating || isUpdate} htmlType="submit">
            {record ? 'Update' : 'Create'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
