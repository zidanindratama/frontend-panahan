import axiosInstance from "@/lib/axios";

export interface User {
  _id: string;
  namaLengkap: string;
  username: string;
  role: "admin" | "user";
  nik: string;
  tglLahir: string;
  noHp: string;
  asal: string;
  alamat: string;
  isMember: boolean;
}

export const getUsers = (
  page = 1,
  limit = 10,
  search = ""
): Promise<{
  data: User[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}> =>
  axiosInstance
    .get("/admin/users", { params: { page, limit, search } })
    .then((res) => res.data);

export const promoteUser = (id: string): Promise<User> =>
  axiosInstance.put(`/admin/promote/${id}`).then((res) => res.data);

export const demoteUser = (id: string): Promise<User> =>
  axiosInstance.put(`/admin/demote/${id}`).then((res) => res.data);

export const toggleMember = (id: string): Promise<User> =>
  axiosInstance.put(`/admin/toggle-member/${id}`).then((res) => res.data);

export const deleteUser = (id: string): Promise<{ message: string }> =>
  axiosInstance.delete(`/admin/users/${id}`).then((res) => res.data);
