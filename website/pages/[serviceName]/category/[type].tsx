import CustomHeader from '../../components/custom-header'
import { useRouter } from "next/router"
import { useSWRInfinite } from 'swr'

import { useEffect } from 'react'




export default function Type() {
    const router = useRouter()
    const fetcher = url => fetch(url).then(r => r.json())
    const { serviceName, type } = router.query
    const getKey = (pageIndex, previousPageData) => {
        console.log(pageIndex)
        if (previousPageData && !previousPageData.length) return null
        return `/api/dashboard?serviceName=${serviceName}&dataType=${type}&page=${pageIndex + 1}`

    }
    const { data, size, setSize } = useSWRInfinite(getKey, fetcher,)
    console.log(data)
    useEffect(() => {
        window.onscroll = async () => {
            console.log((window.innerHeight + window.scrollY) - document.body.offsetHeight)
            if ((window.innerHeight + window.scrollY) - document.body.offsetHeight > 0) {
                setSize(size + 1)
            }
        };
    })
    if (!data) return 'loading';



    return (

        <div>
            <CustomHeader goBack='true' />
            <div className="container-fluid px-1">
                <div className="d-flex mb-3 p-2 bd-highlight flex-wrap justify-content-md-start justify-content-lg-start justify-content-sm-center justify-content-xs-center">
                    {

                        data.map((lists, index) => {
                            return lists.map(d => <div className='p-2' key={d.name}>
                                <div className="card mb-3 p-2" style={{ width: '300px' }}>
                                    <img src={d.image} className="card-img-top" style={{ maxWidth: '100%', height: 'auto' }} />
                                    <hr></hr>
                                    <div className="card-body">
                                        <h5 className="card-title">{d.title}</h5>
                                        {
                                            d.count > 0 && <div className="skillbar clearfix ">
                                                <div className="skillbar-title">
                                                    <span>資料數量</span>
                                                </div>
                                                <div className="skillbar-bar"></div>
                                                <div className="skill-bar-percent">{d.count}</div>
                                            </div>
                                        }
                                        <button className="btn btn-warning"
                                            onClick={() => {
                                                router.push(
                                                    {
                                                        pathname: `/${serviceName}/dataset`,
                                                        query: { queryUrl: d.url },
                                                    }
                                                )
                                            }}
                                        >
                                            看更多<span className="material-icons" style={{ fontSize: '18px' }}>open_in_new</span>
                                        </button>
                                    </div>
                                </div>
                            </div>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}
