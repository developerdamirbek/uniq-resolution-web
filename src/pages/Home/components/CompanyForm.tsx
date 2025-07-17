import { useEffect } from 'react';
import { Form, Modal, Input, Select, Button, Divider } from "antd";
import { useCreateCompany, useUpdateCompany } from "../../../hooks";
import { toast } from '../../../utils/toast';
import {
  UserOutlined,
  IdcardOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import type { Company } from '../../../types/types';
import { Building2 } from 'lucide-react';
import dayjs from 'dayjs';

const { Option } = Select;

interface CompanyFormProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingCompany?: Company | null;
}

interface FormValues {
  name: string;
  inn: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Suspended' | "Closed";
}

export const CompanyForm = ({
  visible,
  onClose,
  onSuccess,
  editingCompany
}: CompanyFormProps) => {
  const { mutate: createCompany, isPending: isCreating } = useCreateCompany();
  const { mutate: updateCompany, isPending: isUpdating } = useUpdateCompany();

  const [form] = Form.useForm<FormValues>();
  const isEditing = !!editingCompany;
  const isSubmitting = isCreating || isUpdating;

  useEffect(() => {
    if (visible) {
      if (editingCompany) {
        form.setFieldsValue({
          name: editingCompany.name,
          inn: editingCompany.inn,
          status: editingCompany.status,
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, editingCompany, form]);

  const handleSubmit = (values: FormValues) => {
    if (isEditing && editingCompany) {
      updateCompany(
        { id: editingCompany.id, ...values },
        {
          onSuccess: () => {
            toast({
              title: 'Success!',
              text: 'Company updated successfully.',
              icon: 'success',
            });
            onSuccess();
          },
          onError: (error: any) => {
            toast({
              title: 'Error!',
              text: error?.message || 'Failed to update company.',
              icon: 'error',
            });
          },
        }
      );
    } else {
      createCompany(
        { 
          ...values, 
          created_at: dayjs().toISOString() 
        }, 
        {
          onSuccess: () => {
            toast({
              title: 'Success!',
              text: 'Company created successfully.',
              icon: 'success',
            });
            onSuccess();
          },
          onError: (error: any) => {
            toast({
              title: 'Error!',
              text: error?.message || 'Failed to create company.',
              icon: 'error',
            });
          },
        }
      );
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <Building2 className="text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 m-0">
              {isEditing ? 'Edit Company' : 'Add New Company'}
            </h2>
            <p className="text-sm text-gray-500 m-0">
              {isEditing ? 'Update company information' : 'Create a new company record'}
            </p>
          </div>
        </div>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={600}
      className="custom-modal"
      destroyOnHidden
    >
      <Divider className="my-6" />

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label={
              <div className="flex items-center gap-2">
                <UserOutlined className="text-blue-500" />
                <span className="font-medium">Company Name</span>
              </div>
            }
            name="name"
            rules={[
              { required: true, message: 'Please enter company name' },
              { min: 2, message: 'Company name must be at least 2 characters' },
              { max: 100, message: 'Company name cannot exceed 100 characters' }
            ]}
            className="mb-4"
          >
            <Input
              placeholder="Enter company name"
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={
              <div className="flex items-center gap-2">
                <IdcardOutlined className="text-green-500" />
                <span className="font-medium">INN</span>
              </div>
            }
            name="inn"
            rules={[
              { required: true, message: 'Please enter INN' },
              {
                pattern: /^[0-9]{9}$/,
                message: 'INN must be exactly 9 digits'
              }
            ]}
            className="mb-4"
          >
            <Input
              placeholder="Enter INN (9 digits)"
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              size="large"
              maxLength={9}
            />
          </Form.Item>
        </div>

        <Form.Item
          label={
            <div className="flex items-center gap-2">
              <CheckCircleOutlined className="text-purple-500" />
              <span className="font-medium">Status</span>
            </div>
          }
          name="status"
          rules={[
            { required: true, message: 'Please select company status' }
          ]}
          className="mb-6"
        >
          <Select
            placeholder="Select company status"
            size="large"
            className="rounded-lg"
          >
            <Option value="Active">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Active
              </div>
            </Option>
            <Option value="Inactive">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Inactive
              </div>
            </Option>
            <Option value="Pending">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Pending
              </div>
            </Option>
            <Option value="Suspended">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Suspended
              </div>
            </Option>
          </Select>
        </Form.Item>

        <Divider className="my-4" />

        <div className="flex justify-end gap-3">
          <Button
            onClick={handleCancel}
            size="large"
            className="rounded-lg px-6"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            size="large"
            className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 rounded-lg px-6 hover:from-blue-700 hover:to-purple-700"
          >
            {isSubmitting
              ? (isEditing ? 'Updating...' : 'Creating...')
              : (isEditing ? 'Update Company' : 'Create Company')
            }
          </Button>
        </div>
      </Form>
    </Modal>
  );
};