import React, { useEffect, useState } from 'react'
import Home from '../../views/newsandbox/home/Home'
import Nopermission from '../../views/newsandbox/nopermission/Nopermission'
import RightList from '../../views/newsandbox/right-manage/RightList'
import RoleList from '../../views/newsandbox/right-manage/RoleList'
import UserList from '../../views/newsandbox/user-manage/UserList'
import { Switch, Route, Redirect } from 'react-router-dom'
import NewsAdd from '../../views/newsandbox/news-manage/NewsAdd'
import NewsDraft from '../../views/newsandbox/news-manage/NewsDraft'
import NewsCategory from '../../views/newsandbox/news-manage/NewsCategory'
import Audit from '../../views/newsandbox/audit-manage/Audit'
import AuditList from '../../views/newsandbox/audit-manage/AuditList'
import Unpublished from '../../views/newsandbox/publish-manage/Unpublished'
import Published from '../../views/newsandbox/publish-manage/Published'
import Sunset from '../../views/newsandbox/publish-manage/Sunset'
import axios from 'axios'
import NewsPreview from '../../views/newsandbox/news-manage/NewsPreview'
import NewsUpdate from '../../views/newsandbox/news-manage/NewsUpdate'
import {Spin } from 'antd'

import {connect} from 'react-redux'
const LocalRouterMap = {
    "/home": Home,
    "/user-manage/list": UserList,
    "/right-manage/role/list": RoleList,
    "/right-manage/right/list": RightList,
    "/news-manage/add": NewsAdd,
    "/news-manage/draft": NewsDraft,
    "/news-manage/category": NewsCategory,
    "/news-manage/preview/:id": NewsPreview,
    "/news-manage/update/:id": NewsUpdate,
    "/audit-manage/audit": Audit,
    "/audit-manage/list": AuditList,
    "/publish-manage/unpublished": Unpublished,
    "/publish-manage/published": Published,
    "/publish-manage/sunset": Sunset
}

function NewsRouter(props) {

    const [BackRouteList, setBackRouteList] = useState([])
    useEffect(() => {
        Promise.all([
            axios.get("/rights"),
            axios.get("/children"),
        ]).then(res => {
            // console.log(res)
            setBackRouteList([...res[0].data, ...res[1].data])
            // console.log(BackRouteList)
        })
    }, [])

    const { role: { rights } } = JSON.parse(localStorage.getItem("token"))

    const checkRoute = (item) => {
        return LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson)
    }

    const checkUserPermission = (item) => {
        return rights.includes(item.key)
    }

    return (
        <Spin size="large" spinning={props.isLoading}>
            <Switch>
                {
                    BackRouteList.map(item => {
                        if (checkRoute(item) && checkUserPermission(item)) {
                            return <Route path={item.key} key={item.key} component={LocalRouterMap[item.key]} exact />
                        }
                        return null
                    }
                    )
                }

                <Redirect from="/" to="/home" exact />
                {
                    BackRouteList.length > 0 && <Route path="*" component={Nopermission} />
                }
            </Switch>
        </Spin>
    )
}

const mapStateToProps = ({LoadingReducer:{isLoading}})=>({
    isLoading
  })

export default connect(mapStateToProps)(NewsRouter)