import React, { lazy, Suspense } from 'react'
const withSuspense = (Component) => {
    return (props) => (
        <Suspense fallback={null}>
            <Component {...props}/>
        </Suspense>
    )
}

// const Recommend = (props) => {
//     return (
//         <Suspense fallback={null}>
//         {/*
//             props手动传给懒加载组件，这样就能获取react-router中的match，history
//         */}
//             <RecommendComponent {...props}></RecommendComponent>
//         </Suspense>
//     )
// }
const Recommend = withSuspense(lazy(() => import('../views/recommend/Recommend')))
const Album =withSuspense(lazy(() => import('../containers/Album')))
const Ranking = withSuspense(lazy(() => import('../views/ranking/Ranking')))
const RankingInfo = withSuspense(lazy(() => import('@/containers/Ranking')))
const Search = withSuspense(lazy(() => import("../containers/Search")))
const SingerList = withSuspense(lazy(() => import("../views/singer/SingerList")))
const Singer = withSuspense(lazy(() => import("@/containers/Singer")))

const router = [
    {
        path: '/recommend',
        component: Recommend,
        routes: [
            {
                path: '/recommend/:id',
                component: Album
            }
        ]
    },
    {
        path:"/ranking",
        component: Ranking,
        routes: [
            {
                path: '/ranking/:id',
                component: RankingInfo
            }
        ]
    },
    {
        path:"/search",
        component: Search,
        routes: [
            {
                path: '/search/album/:id',
                component: Album
            },
            {
                path: '/search/singer/:id',
                component: Singer
            }
        ]
    },
    {
        path: '/singer',
        component: SingerList,
        routes: [
            {
                path: '/singer/:id',
                component: Singer
            }
        ]
    }
]


export default router