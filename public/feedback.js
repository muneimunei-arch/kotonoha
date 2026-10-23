(()=>{
  'use strict';
  const API='https://muneiserver.xsrv.jp/kotonoha-api/feedback.php';
  const form=document.getElementById('feedback-form');
  const list=document.getElementById('feedback-list');
  const empty=document.getElementById('feedback-empty');
  const status=document.getElementById('feedback-status');
  const submit=form.querySelector('[type="submit"]');
  const refresh=document.getElementById('feedback-refresh');
  const dateFormat=new Intl.DateTimeFormat('ja-JP',{timeZone:'Asia/Tokyo',year:'numeric',month:'long',day:'numeric'});

  function setStatus(message,state=''){
    status.textContent=message;
    status.dataset.state=state;
  }

  function formatDate(value){
    const date=new Date(value);
    return Number.isNaN(date.getTime())?'':dateFormat.format(date);
  }

  function render(items){
    list.replaceChildren();
    empty.hidden=items.length!==0;
    items.forEach(item=>{
      const li=document.createElement('li');
      const head=document.createElement('div');
      const name=document.createElement('strong');
      const time=document.createElement('time');
      const comment=document.createElement('p');
      name.textContent=item.nickname;
      time.dateTime=item.created_at;
      time.textContent=formatDate(item.created_at);
      comment.textContent=item.comment;
      head.append(name,time);
      li.append(head,comment);
      list.append(li);
    });
  }

  async function load(){
    let loaded=false;
    refresh.disabled=true;
    setStatus('感想を読み込んでいます。');
    try{
      const response=await fetch(API,{cache:'no-store',credentials:'omit'});
      if(!response.ok) throw new Error('load');
      const data=await response.json();
      render(Array.isArray(data.items)?data.items:[]);
      setStatus('');
      loaded=true;
    }catch(error){
      setStatus('感想を読み込めませんでした。時間を置いて、もう一度お試しください。','error');
    }finally{
      refresh.disabled=false;
    }
    return loaded;
  }

  form.addEventListener('submit',async event=>{
    event.preventDefault();
    if(submit.disabled)return;
    const nickname=form.elements.nickname.value.trim();
    const comment=form.elements.comment.value.trim();
    if(!nickname||!comment){setStatus('ペンネームと感想を入力してください。','error');return;}
    submit.disabled=true;
    form.setAttribute('aria-busy','true');
    setStatus('感想を送信しています。');
    try{
      const response=await fetch(API,{
        method:'POST',
        credentials:'omit',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({nickname,comment,website:form.elements.website.value})
      });
      const data=await response.json().catch(()=>({}));
      if(!response.ok)throw new Error(data.error||'感想を投稿できませんでした。');
      form.reset();
      const loaded=await load();
      setStatus(loaded?'感想を投稿しました。ありがとうございます。':'感想は保存されましたが、一覧を更新できませんでした。再読み込みしてください。',loaded?'success':'error');
    }catch(error){
      setStatus(error.message||'感想を投稿できませんでした。時間を置いて、もう一度お試しください。','error');
    }finally{
      submit.disabled=false;
      form.removeAttribute('aria-busy');
    }
  });

  refresh.addEventListener('click',load);
  load();
})();
