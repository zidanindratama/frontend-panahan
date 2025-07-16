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

export const exportUsers = async () => {
  const response = await axiosInstance.get("/admin/export-users", {
    responseType: "blob",
  });

  const blob = new Blob([response.data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "daftar-pengguna.xlsx");
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const exportAbsensi = async (start?: string, end?: string) => {
  const params: Record<string, string> = {};
  if (start && end) {
    params.start = start;
    params.end = end;
  }

  const res = await axiosInstance.get("/admin/export-absensi", {
    responseType: "blob",
    params,
  });

  // Membuat URL file dan trigger download
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "daftar-absensi.xlsx");
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const getUserStats = async (): Promise<{
  totalAdmin: number;
  totalMember: number;
  totalNonMember: number;
}> => {
  const res = await axiosInstance.get("/admin/stats");
  return res.data;
};
