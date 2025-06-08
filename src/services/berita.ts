import axiosInstance from "@/lib/axios";

export interface TBerita {
  _id: string;
  judul: string;
  deskripsi: string;
  isi: string;
  penulis: string;
  foto?: string;
  tanggal: string;
}

export interface BeritaListResponse {
  data: TBerita[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

// ✅ GET semua berita dengan search, sort, paginasi
export const getBerita = (
  q: string = "",
  sort: "asc" | "desc" = "desc",
  page: number = 1,
  limit: number = 10
): Promise<BeritaListResponse> => {
  const params = { q, sort, page, limit };
  return axiosInstance
    .get("/blog/search/all", { params })
    .then((res) => res.data);
};

// ✅ GET berita by ID
export const getBeritaById = (id: string): Promise<TBerita> => {
  return axiosInstance.get(`/blog/${id}`).then((res) => res.data);
};

// ✅ POST berita baru (form multipart)
export const postBerita = (formData: FormData): Promise<TBerita> => {
  return axiosInstance
    .post("/blog", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

// ✅ PUT update berita
export const updateBerita = (
  id: string,
  formData: FormData
): Promise<TBerita> => {
  return axiosInstance
    .put(`/blog/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

// ✅ DELETE berita
export const deleteBerita = (id: string): Promise<{ message: string }> => {
  return axiosInstance.delete(`/blog/${id}`).then((res) => res.data);
};
