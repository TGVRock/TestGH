import{c,e as n,f as l,t as r,o as m}from"./index-3663960e.js";const u={class:"row my-2"},d={class:"col-md-3 col-form-label"},i={class:"col-md-9"},p=["value","placeholder"],h=c({__name:"TextAreaComponent",props:{itemName:null,placeholder:null,value:null},emits:["update:value"],setup(e,{emit:o}){const s=t=>{const a=t.target;o("update:value",a.value)};return(t,a)=>(m(),n("div",u,[l("label",d,r(e.itemName),1),l("div",i,[l("input",{type:"text",value:e.value,onChange:s,class:"form-control",placeholder:e.placeholder},null,40,p)])]))}});export{h as _};
