import axios, { AxiosResponse } from "axios";

export class DataResource<T> {
  constructor(private endpoint: string) {}

  async loadAll(): Promise<T[]> {
    try {
      const res = await axios.get<T[]>(this.endpoint);
      return res.data;
    } catch (error) {
      console.error("Failed to load all data:", error);
      throw error;
    }
  }

  async loadOne(id: number): Promise<T> {
    try {
      const res = await axios.get<T>(`${this.endpoint}/${id}`);
      return res.data;
    } catch (error) {
      console.error(`Failed to load data with id ${id}:`, error);
      throw error;
    }
  }

  async delete(id: number): Promise<AxiosResponse<void>> {
    try {
      const res = await axios.delete<void>(`${this.endpoint}/${id}`);
      return res;
    } catch (error) {
      console.error(`Failed to delete resource with id ${id}:`, error);
      throw error;
    }
  }

  async save(data: T): Promise<AxiosResponse<void>> {
    try {
      const res = await axios.post<void>(this.endpoint, data, {
        headers: { "Content-Type": "application/json" },
      });
      return res;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to save data:", error.response?.data);
        throw new Error(
          `Error: ${error.response?.status} - ${error.response?.statusText}`
        );
      } else {
        console.error("Failed to save data:", error);
        throw error;
      }
    }
  }
}
