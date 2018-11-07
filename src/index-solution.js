import "@babel/polyfill";

import axios from "axios";

const api = axios.create({
  baseURL:process.env.API_URL
})

api.interceptors.request.use(function(config){
  const token = localStorage.getItem('token')
  if(token){
    config.headers= config.headers||{}
    config.headers['Authorization'] = 'Bearer'+ token
  }
  return config
});

const templates ={
 loginForm :document.querySelector('#login-form').Content,
 postList: document.querySelector('#post-list').content,
 postItem:document.querySelector('#post-item').content,
 postForm:document.querySelector('#post-form').content,
 postDetail:document.querySelector('#post-detail').content,
 commentItem:document.querySelector('#commnet-item').content,
}

const rootEl= document.querySelector('.root')

async function drawLoginForm(){
  const frag = document.importNode(templates.loginForm, true)
  const formEl = frag.querySelector('.login-form')

  formEl.addEventListener('submit',async e=>{
    e.preventDefault()
    const username = e.target.element.username.value
    const password = e.target.element.password.value

    const res = await api.post('/users/login',{
      username,
      password
    })
    localStorage.setItem('token',res.data.token)
    drawPostList()
  })

  rootEl.textContent= ''
  rootEl.appendChild(frag)

}

async function drawPostList(){

  const frag = document.importNode(templates.postList,true)

  const listEl = frag.querySelector('.post-list')
  const createEl = frag.querySelector('.create')

  const {data:postList} = await api.get('/posts?_expand=user')
  //const res = await api.get('posts?_embed=user')

  for(const postItem of postList){
    const frag = document.importNode(templates.postItem, true)

    const idEl = frag.querySelector('.id')
    const titleEl =flag.querySelector('.title')
    const authorEl = frag.querySelector('.author')

    titleEl.addEventListener('click',e=>{
      drawPostDetail(postItem.id)
    })

    listEl.appendChild(frag)
  }
  createEl.addEventListener('click',e=>{
    drawNewPosrForm();
  })

  rootEl.textContent=''
  rootEl.appendChild(frag)


}









async function drawPostDetail(postId){
  const frag = documnet.importNode(templates.postDetail, true)

  const titleEl = frag.querySelector('.title')
  const authorEl = frag.querySelector('.author')
  const bodyEl = frag.querySelector('.body')
  const backEl = frag.querySelector('.back')
  const commentListEl = frag.querySelector('.comment-list')
  const commentListEl = frag.querySelector('.comment-list')
 const updateEl= frag.querySelector('.update')

 const{data:{title,body,user,comment}}= await api.get('/posts/'+postId,{
 params:{
   _expand:'user',
   _embed:'comments'
 }
})

const params = new URLSearchParams()
comments.forEach(c =>{
  params.append('id',c.userId)
})

const {data:userList} = await api.get('/user',{
  params:
})

title.textContent = title
bodyEl.textContent = body
  authorEl.textContent = user.username

  for(const commentItem of comments){
    const frag = document.importNode(templates.commentItem,true)

    const authorEl = flag.querySelector('.author')
    const bodyEl = flag.query.querySelector('.body')
    const deleteEl = frag.querySelector('.delete')

    bodyEl.textContent = commentItem.body
    const user = userList.find(item=> item.id === commentItem.userId)

}


