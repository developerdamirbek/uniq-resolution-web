import { Button, Form, Input, message, Modal } from 'antd';
import { useUpdataProjects } from './service/mutation/useUpdateProjects';
import { useCreateProjects } from './service/mutation/useCreateProjects';
import { useEffect } from 'react';

interface ProjectsModalProps {
  open: boolean;
  onClose: () => void;
  record?: { id: number; name: string; link: string; description: string; skills: [] } | null;
  refetch: () => void;
}

export const ProjectModal = ({ open, onClose, record, refetch }: ProjectsModalProps) => {
  const [form] = Form.useForm();

  const { mutate: create, isPending: isCreating } = useCreateProjects();
  const { mutate: update, isPending: isUpdate } = useUpdataProjects();

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        name: record.name,
        link: record.link,
        description: record.description,
        skills: record.skills,
      });
    } else {
      form.resetFields();
    }
  }, [record, form]);

  const handelSubmit = (values: {
    name: string;
    link: string;
    description: string;
    skills: [];
  }) => {
    if (record) {
      update(
        {
          id: record.id,
          name: values.name,
          link: values.link,
          description: values.description,
          skills: values.skills,
        },
        {
          onSuccess: () => {
            refetch();
            form.resetFields();
            onClose();
            message.success('Projects create sucsessfully!');
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
          message.success('Projects create sucsessfully!');
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
      title={record ? 'Update Projects' : 'Create Projects'}
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
        <Form.Item
          name="description"
          label="Description"
          required
          rules={[{ required: true, message: 'Please Enter Your Description!' }]}
        >
          <Input placeholder="Enter description" />
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
