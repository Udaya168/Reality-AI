import { initialAdminProperties, initialAdminUsers, initialAdminReports } from '../../../data/mock/mockAdmin';
import { AdminPropertyItem, AdminUserItem, AdminReportItem } from '../../../types/admin';

export const adminService = {
  getProperties(): Promise<AdminPropertyItem[]> {
    return Promise.resolve(initialAdminProperties);
  },
  getUsers(): Promise<AdminUserItem[]> {
    return Promise.resolve(initialAdminUsers);
  },
  getReports(): Promise<AdminReportItem[]> {
    return Promise.resolve(initialAdminReports);
  },
};
