import{d as i,g as m,c as a,F as v,r as d,p,o as s,t as g}from"./index-1840cd32.js";const b=["value"],f=["value"],k=i({__name:"SelectboxComponent",props:{attributes:null,items:null,value:null,size:null},emits:["update:value"],setup(e,{emit:c}){const l=e,n=m("form-select");switch(l.size){case"sm":case"md":case"lg":case"xl":n.value+="-"+l.size;break}const r=u=>{const o=u.target;c("update:value",o.value)};return(u,o)=>(s(),a("select",p(e.attributes,{value:e.value,onChange:r,class:n.value}),[(s(!0),a(v,null,d(e.items,t=>(s(),a("option",{key:`${e.attributes.ariaLabel}-${t.key}`,value:t.value},g(t.display),9,f))),128))],16,b))}});export{k as _};
