export default function({ $axios, redirect }: any) {
  // request interceptor
  $axios.interceptors.request.use(
    (config: any) => {
      // do something before request is sent
      return config
    },
    (error: any) => {
      // do something with request error
      return Promise.reject(error)
    }
  )
  $axios.onRequest((config: any) => {
    console.log('Making request to ' + config.url)
  })

  // response interceptor
  $axios.interceptors.response.use(
    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response: any) => {
      const res = response.data
      if (res.code === 200) {
        return res
      } else {
        redirect('/404')
        // if the custom code is not 200, it is judged as an error.
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    },
    (error: any) => {
      console.log('err' + error) // for debug

      return Promise.reject(error)
    }
  )

  $axios.onError((error: any) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/404')
    } else if (code === 500) {
      redirect('/500')
    }
  })
}
