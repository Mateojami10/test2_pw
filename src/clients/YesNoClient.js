import axios from 'axios';

const consumirApi = async () => {
    const resp = await axios.get('https://yesno.wtf/api').then(r => r.data);
    console.log(resp);
    return resp;
};

export async function consumirApiFacade() {
    return await consumirApi();
}