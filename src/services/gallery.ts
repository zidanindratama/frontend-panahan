import axiosInstance from "@/lib/axios";

export type TGallery = {
  _id: string;
  judul: string;
  deskripsi: string;
  gambar: string;
  tanggal: string;
};

// ✅ READ (search + pagination)
export const getGallery = async (
  q = "",
  sort: "asc" | "desc" = "desc",
  page = 1,
  limit = 5
) => {
  const res = await axiosInstance.get("/gallery", {
    params: { q, sort, page, limit },
  });
  return res.data;
};

// ✅ GET BY ID
export const getGalleryById = async (id: string) => {
  const res = await axiosInstance.get(`/gallery/${id}`);
  return res.data;
};

// ✅ CREATE
export const createGallery = async (formData: FormData) => {
  const res = await axiosInstance.post("/gallery", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// ✅ UPDATE
export const updateGallery = async (id: string, formData: FormData) => {
  const res = await axiosInstance.put(`/gallery/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// ✅ DELETE
export const deleteGallery = async (id: string) => {
  const res = await axiosInstance.delete(`/gallery/${id}`);
  return res.data;
};
