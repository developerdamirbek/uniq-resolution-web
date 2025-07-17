import { useState, useMemo } from 'react';
import {
  Table,
  Input,
  Select,
  Space,
  Button,
  Tag,
  DatePicker,
  Pagination,
  Tooltip,
} from 'antd';
import {
  FilterOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { ColumnType } from 'antd/es/table';
import type { TableProps } from 'antd';
import { useGetCompanies } from "../../hooks";
import { PlusCircle } from 'lucide-react';
import { CompanyForm } from './components/CompanyForm';
import { toast } from '../../utils/toast';
import { useDeleteCompany } from "../../hooks";
import { getStatusColor } from '../../utils/statusColors';
import type { Company, FilterState, SortState } from '../../types/types';
import { Loading } from '../../components/layout';

const { Option } = Select;

const filterCompanies = (companies: Company[], filters: FilterState): Company[] => {
  return companies.filter(company => {
    const nameMatch = !filters.name ||
      company.name.toLowerCase().includes(filters.name.toLowerCase());

    const statusMatch = !filters.status || company.status === filters.status;

    const dateMatch = !filters.dateRange || (
      new Date(company.created_at) >= new Date(filters.dateRange[0]) &&
      new Date(company.created_at) <= new Date(filters.dateRange[1])
    );

    return nameMatch && statusMatch && dateMatch;
  });
};

const sortCompanies = (companies: Company[], sort: SortState): Company[] => {
  if (!sort.field || !sort.order) return companies;

  return [...companies].sort((a, b) => {
    let aValue: any = a[sort.field as keyof Company];
    let bValue: any = b[sort.field as keyof Company];

    if (sort.field === 'created_at') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sort.order === 'ascend') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

export const Home = () => {
  const { data: companies, refetch, isLoading } = useGetCompanies();
  const { mutate: deleteCompany } = useDeleteCompany();

  const [filters, setFilters] = useState<FilterState>({
    name: '',
    status: '',
    dateRange: null
  });

  const [sort, setSort] = useState<SortState>({
    field: '',
    order: null
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} of ${total} companies`
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const processedData = useMemo(() => {
    if (!companies) return [];

    const filtered = filterCompanies(companies, filters);
    const sorted = sortCompanies(filtered, sort);

    return sorted;
  }, [companies, filters, sort]);

  const paginatedData = useMemo(() => {
    const start = (pagination.current - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    return processedData.slice(start, end);
  }, [processedData, pagination.current, pagination.pageSize]);

  const handleDelete = (company: Company) => {
    toast({
      title: 'Are you sure?',
      text: `Do you want to delete ${company.name}?`,
      icon: 'warning',
      timer: 10000,
      position: 'center',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      showConfirmButton: true,
      toast: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCompany(company.id, {
          onSuccess: () => {
            toast({
              title: 'Deleted!',
              text: 'Company has been deleted.',
              icon: 'success',
              position: 'top',
            });
            refetch();
          },
          onError: () => {
            toast({
              title: 'Error!',
              text: 'Failed to delete company.',
              icon: 'error',
            });
          },
        });
      }
    });
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setIsFormVisible(true);
  };

  const handleAdd = () => {
    setEditingCompany(null);
    setIsFormVisible(true);
  };

  const columns: ColumnType<Company>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortOrder: sort.field === 'name' ? sort.order : null,
      render: (text: string) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
            {text.charAt(0).toUpperCase()}
          </div>
          <span className="font-semibold text-gray-900">{text}</span>
        </div>
      ),
      width: '30%'
    },
    {
      title: 'INN',
      dataIndex: 'inn',
      key: 'inn',
      sorter: true,
      sortOrder: sort.field === 'inn' ? sort.order : null,
      render: (text: string) => (
        <span className="font-mono text-sm text-gray-700 bg-gray-50 px-2 py-1 rounded">
          {text}
        </span>
      ),
      width: '20%'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      sortOrder: sort.field === 'status' ? sort.order : null,
      render: (status: string) => (
        <Tag
          color={getStatusColor(status)}
          className="font-medium px-3 py-1 rounded-full"
          style={{
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          {status}
        </Tag>
      ),
      width: '15%'
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: true,
      sortOrder: sort.field === 'created_at' ? sort.order : null,
      render: (date: string) => (
        <div className="text-gray-600">
          <div className="font-medium">
            {new Date(date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
          <div className="text-xs text-gray-400">
            {new Date(date).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      ),
      width: '20%'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: Company) => (
        <Space size="small">
          <Tooltip title="Edit Company">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              className="text-green-600 hover:text-green-800 hover:bg-green-50"
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Company">
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              className="text-red-600 hover:text-red-800 hover:bg-red-50"
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </Space>
      ),
      width: '15%'
    }
  ];

  const handleTableChange: TableProps<Company>['onChange'] = (_, __, sorter) => {
    if (Array.isArray(sorter)) {
      const firstSorter = sorter[0];
      setSort({
        field: firstSorter?.field as string || '',
        order: firstSorter?.order || null
      });
    } else {
      setSort({
        field: sorter?.field as string || '',
        order: sorter?.order || null
      });
    }
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setPagination(prev => ({
      ...prev,
      current: 1
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      name: '',
      status: '',
      dateRange: null
    });
    setSort({
      field: '',
      order: null
    });
    setPagination(prev => ({
      ...prev,
      current: 1
    }));
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
    setEditingCompany(null);
  };

  const handleFormSuccess = () => {
    setIsFormVisible(false);
    setEditingCompany(null);
    refetch();
  };

  if (isLoading) {
    return (
      <Loading fullScreen text="Loading companies..." />
    );
  }

  return (
    <div className="p-2">
      <div className="">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-60">
              <Input.Search
                enterButton
                placeholder="Search companies..."
                value={filters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
                allowClear
                className="!rounded-2xl"
              />
            </div>

            <div className="flex-1 min-w-48">

              <Select
                placeholder="Filter by status..."
                value={filters.status || undefined}
                onChange={(value) => handleFilterChange('status', value)}
                allowClear
                className="w-full"
              >
                <Option value="Active">
                  <Tag color="green" className="mr-2">Active</Tag>
                </Option>
                <Option value="Inactive">
                  <Tag color="red" className="mr-2">Inactive</Tag>
                </Option>
                <Option value="Pending">
                  <Tag color="orange" className="mr-2">Pending</Tag>
                </Option>
                <Option value="Suspended">
                  <Tag color="purple" className="mr-2">Suspended</Tag>
                </Option>
              </Select>
            </div>

            <div className="flex-1 min-w-72">

              <DatePicker.RangePicker
                className="w-full rounded-lg"
                onChange={(dates, dateStrings) =>
                  handleFilterChange('dateRange', dates ? dateStrings : null)
                }
              />
            </div>

            <div className="flex gap-2">
              <Button
                icon={<FilterOutlined />}
                onClick={handleClearFilters}
                className="rounded-lg"
              >
                Clear
              </Button>
            </div>

          </div>

          <Button
            type="primary"
            onClick={handleAdd}
            className=" !rounded-xl !h-9 shadow-lg"
          >
            <PlusCircle />
            Add Company
          </Button>
        </div>

        <Table<Company>
          columns={columns}
          dataSource={paginatedData}
          rowKey="id"
          pagination={false}
          onChange={handleTableChange}
          loading={isLoading}
          className="rounded-lg"
          scroll={{ x: "max-content", y: "calc(100vh - 280px)" }}
          size="middle"
          rowClassName="hover:bg-blue-50 transition-colors"
        />

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-end">
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={processedData.length}
            showSizeChanger={pagination.showSizeChanger}
            showQuickJumper={pagination.showQuickJumper}
            showTotal={pagination.showTotal}
            onChange={(page, pageSize) => {
              setPagination(prev => ({
                ...prev,
                current: page,
                pageSize: pageSize || prev.pageSize
              }));
            }}
            className="custom-pagination"
          />
        </div>

        <CompanyForm
          visible={isFormVisible}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
          editingCompany={editingCompany}
        />
      </div>
    </div>
  );
};