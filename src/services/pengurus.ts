import axiosInstance from "@/lib/axios";

// Interface tipe data pengurus
export interface TPengurus {
  _id: string;
  nama: string;
  jabatan: string;
  foto?: string;
}

// Response untuk list dengan paginasi
export interface PengurusListResponse {
  data: TPengurus[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

// ✅ GET semua pengurus dengan search, filter jabatan, dan paginasi
export const getPengurus = (
  q: string = "",
  jabatan: string = "",
  page: number = 1,
  limit: number = 10
): Promise<PengurusListResponse> => {
  const params = { q, jabatan, page, limit };
  return axiosInstance.get("/pengurus", { params }).then((res) => res.data);
};

// ✅ GET semua pengurus tanpa paginasi (misal untuk dropdown)
export const getAllPengurus = (jabatan: string = ""): Promise<TPengurus[]> => {
  const params = jabatan ? { jabatan } : {};
  return axiosInstance.get("/pengurus/all", { params }).then((res) => res.data);
};

// ✅ GET pengurus by ID
export const getPengurusById = (id: string): Promise<TPengurus> => {
  return axiosInstance.get(`/pengurus/${id}`).then((res) => res.data);
};

// ✅ POST tambah pengurus (FormData)
export const postPengurus = (formData: FormData): Promise<TPengurus> => {
  return axiosInstance
    .post("/pengurus", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

// ✅ PUT update pengurus (FormData)
export const updatePengurus = (
  id: string,
  formData: FormData
): Promise<TPengurus> => {
  return axiosInstance
    .put(`/pengurus/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

// ✅ DELETE pengurus
export const deletePengurus = (id: string): Promise<{ message: string }> => {
  return axiosInstance.delete(`/pengurus/${id}`).then((res) => res.data);
};
