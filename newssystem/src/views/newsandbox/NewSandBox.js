import React , { useEffect }from 'react'
import TopHeader from '../../components/sandbox/TopHeader'
import SideMenu from '../../components/sandbox/SideMenu'
import NewsRouter from '../../components/sandbox/NewRouter'
import { Layout , theme } from 'antd'
import './NewSandBox.css';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const { Content } = Layout;
export default function NewSandBox() {
  NProgress.start()
    useEffect(()=>{
        NProgress.done()
    })
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  return (
    <div className='layout'>
      <Layout >
      <SideMenu></SideMenu>
      <Layout >
        <TopHeader></TopHeader>
        <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              overflow:"auto"
            }}
          >
          <NewsRouter></NewsRouter>
        </Content>
      </Layout>
      
    </Layout>
    </div>
    
  )
}
