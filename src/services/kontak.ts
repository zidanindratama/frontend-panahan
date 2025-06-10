import axiosInstance from "@/lib/axios";

export type TKontak = {
  _id: string;
  instagram: string;
  whatsapp: string;
};

export const getKontak = async () => {
  const res = await axiosInstance.get("/kontak");
  return res.data;
};

export const saveKontak = async (data: {
  instagram: string;
  whatsapp: string;
}) => {
  const res = await axiosInstance.post("/kontak", data);
  return res.data;
};
