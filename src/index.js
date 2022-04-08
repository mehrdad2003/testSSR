import express from 'express'
import 'babel-polyfill'
import {matchRoutes} from 'react-router-config'
import 'dotenv/config'
import proxy from 'express-http-proxy';
import Routes from './client/Routes'
import renderer from './helpers/renderer'
import createStore from './helpers/createStore'

const app=express()

app.use(express.static('public'))
app.use(
    '/api',
    proxy('http://react-ssr-api.herokuapp.com', {
      proxyReqOptDecorator(opts) {
        opts.headers['x-forwarded-host'] = 'localhost:3000';
        return opts;
      }
    })
  );
app.get('*',(req,res)=>{
    const store=createStore(req)
 const promises=matchRoutes(Routes,req.path).map(({route})=>{
        return route.loadData?route.loadData(store):null
    })
 Promise.all(promises).then(()=>{
    res.send(renderer(req,store))
 })
   
})
const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log('server is run');
}) 