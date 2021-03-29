
export const getApiUrl=( apiName:string='')=>{
   console.log(apiName)
   return  process.env.API_URL!==undefined?`${process.env.API_URL}/invoke/${apiName}/method`:`http://localhost:${process.env[apiName.toUpperCase()]}`
}