import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { PaginatedResponse } from "../../features/components/pagination";
import { store } from "../redux/configureStore";

axios.defaults.baseURL = "http://localhost:5000/api/"
axios.defaults.withCredentials = true; //อนุญาตให้เข้าถึงคุกกี้ที่ browser ได้

const sleep = () => new Promise(resolve => setTimeout(resolve, 500)); //delay

const responseBody = (response: AxiosResponse) => response.data;
//แนบ token ไปกับ Header
axios.interceptors.request.use((config: any) => {
    const token = store.getState().account.user?.token; //เรียกใช้ State โดยตรง
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

//You can intercept requests or responses before they are handled by then or catch.
//.use มี Promise คือ onFullfill กรณีสำเร็จ onReject กรณีมีข้อผิดพลาด
axios.interceptors.response.use(async response => {
    await sleep()
    const pagination = response.headers['pagination']; //ส่งมาจาก ProductController
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }
    return response
}, (error: AxiosError) => {
    console.log('caught by interceptor')
    const { data, status } = error.response!
    var json = JSON.stringify(data)
    var result = JSON.parse(json) //แปลงเป็น object

    switch (status) {
        case 400:
            //ตรวจสอบค่าที่ส่งมาจาก GetValidationError()
            if (result.errors) {
                const modelStateErrors: string[] = [];
                for (const key in result.errors) {
                    if (result.errors[key]) {
                        modelStateErrors.push(result.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(result.title);
            break;
        case 401:
            toast.error(result.title || 'Unauthorized');
            break;
        case 403:
            toast.error('You are not allowed to do that!');
            break;
        case 500:
            // history.push('/server-error', { state: data })
            toast.error(result.title);
            break;
        default:
            break;
    }

    return Promise.reject(error.response) //ส่งไปให้ catch(error) นำไปใช้ได้เลย
})

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string, data: FormData) => axios.post(url, data, {
        headers: { 'Content-type': 'multipart/form-data' }   //มันคือpath form ต้องใส่นะ
    }).then(responseBody),
    putForm: (url: string, data: FormData) => axios.put(url, data, {
        headers: { 'Content-type': 'multipart/form-data' }
    }).then(responseBody)


}

const TestErrors = {
    get400Error: () => requests.get('buggy/GetBadRequest'),
    get401Error: () => requests.get('buggy/GetUnAuthorized'),
    get404Error: () => requests.get('buggy/GetNotFound'),
    get500Error: () => requests.get('buggy/GetServerError'),
    getValidationError: () => requests.get('buggy/GetValidationError'),
}
const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser'),
    fetchAddress: () => requests.get('account/savedAddress')
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const Category = {
    list: () => requests.get('category'),
    fetch: (id: number) => requests.get(`category/${id}`),
    fetchFilters: () => requests.get('category/filters'),
}

const ImageProduct = {
    list: (params: URLSearchParams) => requests.get('imageproduct', params),
    fetch: (id: number) => requests.get(`imageproduct/${id}`),
}

const Orders = {
    list: () => requests.get('orders'),
    fetch: (id: number) => requests.get(`orders/${id}`),
    create: (values: any) => requests.post('orders', values)
}

const Products = {
    list: (params: URLSearchParams) => requests.get('product', params),
    details: (id: number) => requests.get(`product/${id}`),
    fetchFilters: () => requests.get('product/filters'),
}
const Payments = {
    createPaymentIntent: () => requests.post('payments', {})
}

const Review = {
    list: () => requests.get('review'),
    fetch: (id: number) => requests.get('review/${id}')
}

const Sender = {
    list: () => requests.get('sender'),
    fetch: (id: number) => requests.get('sender/${id}')
}

const Stock = {
    list: () => requests.get('stock'),
    fetch: (id: number) => requests.get('stock/${id}')
}

const Voucher = {
    list: () => requests.get('voucher'),
    fetch: (id: number) => requests.get('voucher/${id}')
}
function createFormData(item: any) {
    let formData = new FormData();
    for (const key in item) {
        formData.append(key, item[key])
    }
    return formData;
}

const Admin = {
    createProduct: (product: any) => requests.postForm('product', createFormData(product)),
    updateProduct: (product: any) => requests.putForm('product', createFormData(product)),
    deleteProduct: (id: number) => requests.delete(`product/${id}`),

    createCategory: (category: any) => requests.postForm('category', createFormData(category)),
    updateCategory: (category: any) => requests.putForm('category', createFormData(category)),
    deleteCategory: (id: number) => requests.delete(`category/${id}`),
}


const agent = {
    TestErrors,
    Products,
    Basket,
    Account,
    Orders,
    Voucher,
    Category,
    ImageProduct,
    Review, Sender, Stock, Payments, Admin
}

export default agent;
