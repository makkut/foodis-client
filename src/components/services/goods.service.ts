import axios from "axios"

axios.defaults.baseURL = process.env.API_URL;

export const GoodsServices = {
    async getAll() {
        const { data }: any = await axios.get(`/api/items?populate=image`)
        return data
    },

    async getByID(id: any) {
        const { data }: any = await axios.get(`/api/items?populate=image&filters[id][$eq]=${id}`, {
            params: {
                id
            }
        })
        return data
    },

    async searchByName(name: any) {
        const { data }: any = await axios.get(`/api/items?populate=image&filters[name][$contains]=${name}`, {
            params: {
                name
            }
        })
        return data
    }
}