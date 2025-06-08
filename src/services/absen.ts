import axiosInstance from "@/lib/axios";

export interface AbsenResponse {
  message: string;
}

export interface CekAbsenResponse {
  sudahAbsen: boolean;
}

export interface RiwayatAbsen {
  _id: string;
  user: string;
  waktu: string;
  keterangan: string;
}

export interface KehadiranAdmin {
  _id: string;
  user?: {
    namaLengkap: string;
    username: string;
  } | null;
  waktu: string;
  keterangan: string;
}

export const cekAbsen = (): Promise<CekAbsenResponse> =>
  axiosInstance.get("/absensi/cek").then((res) => res.data);

export const absenSekarang = (): Promise<AbsenResponse> =>
  axiosInstance.post("/absensi").then((res) => res.data);

export const getRiwayatAbsen = async (
  start?: string,
  end?: string,
  page: number = 1
): Promise<{
  data: RiwayatAbsen[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}> => {
  const params: Record<string, any> = { page };
  if (start && end) {
    params.start = start;
    params.end = end;
  }

  const res = await axiosInstance.get("/absensi/riwayat", { params });
  return res.data;
};

export const getRiwayatKehadiranAdmin = (
  start?: string,
  end?: string,
  page = 1,
  limit = 10
): Promise<{
  data: KehadiranAdmin[];
  totalPages: number;
  currentPage: number;
}> => {
  const params: Record<string, string | number> = { page, limit };
  if (start) params.start = start;
  if (end) params.end = end;

  return axiosInstance
    .get("/admin/absensi", { params })
    .then((res) => res.data);
};
