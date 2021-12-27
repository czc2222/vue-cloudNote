import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' //设置请求头
axios.defaults.baseURL ='http://note-server.hunger-valley.com'


export default function request (url,type='Get',data={}){
  return new Promise((resolve,reject)=>{
    let options={
      url,
      method:type,
      validateStatus(status){
        return (status >=200 || status < 300) || status ===400
      }
    }
    if(type.toLowerCase() ==='get'){
      options.params = data
    }else {
      options.data = data
    }
    axios(options).then(res=>{
      if(res.status === 200){
        resolve(res.data)
      }else {
        console.log(res.data);
        reject(res.data)

      }
    }).catch(err=>{
      console.log({msg:'网络异常'})
     reject({msg:'网络异常'})


    })
  })
}
