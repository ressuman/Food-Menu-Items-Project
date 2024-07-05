import axios from "axios";

export class DataResource<T> {
  constructor(private endpoint: string) {}

  async loadAll(): Promise<T[]> {
    const res = await axios.get<T[]>(this.endpoint);
    return res.data;
  }

  async loadOne(id: number): Promise<T> {
    const res = await axios.get<T>(`${this.endpoint}/${id}`);
    return res.data;
  }

  async delete(id: number): Promise<void> {
    await axios.delete(`${this.endpoint}/${id}`);
  }

  async save(data: T): Promise<T> {
    const res = await axios.post<T>(this.endpoint, data);
    return res.data;
  }
}
