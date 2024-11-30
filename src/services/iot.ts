
import axios from 'axios'

const serviceIot = {
  getLatestAnalysis: async(): Promise<any> => {
    // console.log('111111111')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/latest-analysis`)
    // console.log('response------', response)
    return response.data
  },
  getImagesByName: async (name: string): Promise<any> => {
    const response = await axios.get(`/images/${name}`)
    return response.data
  }
}

export default serviceIot
