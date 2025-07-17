export const getStatusColor = (status: string): string => {
  const colors = {
    Active: 'green',
    Inactive: 'red',
    Pending: 'orange',
    Suspended: 'purple'
  };
  return colors[status as keyof typeof colors] || 'default';
};