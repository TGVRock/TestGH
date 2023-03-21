import{u as k,a as E,j as K,C as w,d as V,b as J,r as c,w as Q}from"./index-3663960e.js";import{a as Y,g as P}from"./account-b4451352.js";import{i as W,a as ee}from"./mosaic-f8846113.js";import{e as ne,n as te,o as oe,p as ae,q as N,j as ie,k as re,l as L,m as se}from"./eternalbookprotocol-fd5d8ca6.js";var x=(e=>(e.Undefined="Undefined",e.Fetching="Fetching",e.Complete="Complete",e.Failed="Failed",e))(x||{}),t=(e=>(e.Standby="Standby",e.Preprocess="Preprocess",e.LockAnnounced="LockAnnounced",e.LockSigning="LockSigning",e.LockUnconfirmed="LockUnconfirmed",e.LockConfirmed="LockConfirmed",e.TxSigning="TxSigning",e.TxAnnounced="TxAnnounced",e.TxWaitCosign="TxWaitCosign",e.TxUnconfirmed="TxUnconfirmed",e.TxConfirmed="TxConfirmed",e.Complete="Complete",e.Failed="Failed",e))(t||{});const f=k(),C=E();async function O(e,d,g,h,m,l,u){const r="open listener:";if(f.logger.debug(r,e,"start"),typeof C.namespaceRepo>"u"){f.logger.error(r,e,"repository undefined.");return}const a=new K.Listener(C.wsEndpoint,C.namespaceRepo,WebSocket);return await a.open().then(()=>{f.logger.debug(r,e,"listener opened."),a.newBlock(),a.status(d,g).subscribe(n=>{f.logger.error(r,e,"tx status:",n),typeof u<"u"&&u(),a.close()}),a.aggregateBondedAdded(d,g).subscribe(()=>{f.logger.debug(r,e,"tx aggregate bonded added"),typeof h<"u"&&h()}),a.unconfirmedAdded(d,g).subscribe(()=>{f.logger.debug(r,e,"tx unconfirmed added"),typeof m<"u"&&m()}),a.confirmed(d,g).subscribe(async()=>{f.logger.debug(r,e,"tx confirmed"),typeof l<"u"&&l(),a.close()})}).catch(n=>{f.logger.error(r,e,"failed.",n)}),f.logger.debug(r,e,"end"),a}const q=k(),X=E();async function de(){const e="get tx fees:";if(typeof X.networkRepo>"u"){q.logger.error(e,"repository undefined.");return}return await X.networkRepo.getTransactionFees().toPromise()}async function _(e){const d="get tx fee:",g=await de();return typeof g>"u"?(q.logger.error(d,"get tx fees failed."),w.TX_FEE_MULTIPLIER_DEFAULT):ne(g,e)}const pe=V("WriteOnChainData",()=>{const e=k(),d=E(),g=J(),h=c(""),m=c(""),l=c(""),u=c(void 0),r=c(x.Undefined),a=c(""),n=c(t.Standby),s=c(0),F=c("");Q(l,()=>{const i="write data store watch:";if(e.logger.debug(i,"start",l.value),!W(l.value)){r.value=l.value.length===0?x.Undefined:x.Failed,u.value=void 0;return}ee(l.value).then(o=>{e.logger.debug(i,"get mosaic info complete.",o),u.value=o,r.value=x.Complete}).catch(o=>{e.logger.debug(i,"get account info failed.",o),u.value=void 0,r.value=x.Failed}),e.logger.debug(i,"end")},{immediate:!0});async function B(){const i="write data:";if(e.logger.debug(i,"start"),n.value!==t.Standby&&n.value!==t.Complete&&n.value!==t.Failed){e.logger.error(i,"other processing.");return}if(n.value=t.Preprocess,s.value=0,F.value="",a.value.length===0){e.logger.error(i,"data no setting."),n.value=t.Failed;return}if(typeof u.value>"u"){e.logger.error(i,"mosaic info undefined."),n.value=t.Failed;return}const o=await Y(u.value.ownerAddress.plain());if(typeof o>"u"){e.logger.error(i,"get multisig info failed."),n.value=t.Failed;return}const y=o.isMultisig();I(y),e.logger.debug(i,"end")}async function I(i){var D,H;const o="write data:";if(e.logger.debug(o,"start"),n.value=t.Preprocess,e.logger.debug(o,"processed size",s.value),s.value>=a.value.length){e.logger.debug(o,"all data proceeded."),n.value=t.Complete;return}const y=s.value+w.TX_DATASIZE_PER_TRANSFER*w.TX_DATA_TX_NUM>=a.value.length,p=u.value;if(typeof p>"u"){e.logger.error(o,"mosaic info undefined."),n.value=t.Failed;return}const S=await P(p.ownerAddress.plain());if(typeof S>"u"){e.logger.error(o,"account info invalid."),n.value=t.Failed;return}const G=te(p.id.toHex(),p.ownerAddress.plain(),h.value,m.value,s.value===0?void 0:F.value,y?oe(a.value):void 0),U=ae(G,p.id.toHex());if(typeof U>"u"){e.logger.error(o,"create crypto header failed."),n.value=t.Failed;return}const b=[],j=N(S,U);for(b.push(j.toAggregate(S.publicAccount));b.length<w.TX_AGGREGATE_INNER_NUM&&!(s.value>=a.value.length);){const T=a.value.substring(s.value,s.value+w.TX_DATASIZE_PER_TRANSFER),$=N(S,T);b.push($.toAggregate(S.publicAccount)),s.value+=T.length}const R=i?ie(b,await _(e.feeKind)):re(b,await _(e.feeKind));if(!e.useSSS&&typeof e.account>"u"){e.logger.error(o,"account invalid."),n.value=t.Failed;return}n.value=t.TxSigning;const v=e.useSSS?await g.requestTxSign(R):(D=e.account)==null?void 0:D.sign(R,d.generationHash);if(typeof v>"u"){e.logger.error(o,"sss sign failed."),n.value=t.Failed;return}if(typeof await O("write data",p.ownerAddress,v.hash,()=>{n.value=t.TxWaitCosign},()=>{n.value=t.TxUnconfirmed},async()=>{s.value<a.value.length?(F.value=v.hash,I(i)):(F.value="",n.value=t.Complete)},()=>{n.value=t.Failed})>"u"){e.logger.error(o,"open create mosaic tx listener failed."),n.value=t.Failed;return}if(!i){n.value=t.TxAnnounced;const T=await L(v);e.logger.debug(o,"aggregate complete tx announced.",[v,T]),e.logger.debug(o,"aggregate complete end");return}const M=se(v,await _(e.feeKind));n.value=t.LockSigning;const A=e.useSSS?await g.requestTxSign(M):(H=e.account)==null?void 0:H.sign(M,d.generationHash);if(typeof A>"u"){e.logger.error(o,"sss sign failed."),n.value=t.Failed;return}const z=K.Address.createFromPublicKey(A.signerPublicKey,d.networkType);if(typeof await O("hash lock",z,A.hash,void 0,()=>{n.value=t.LockUnconfirmed},async()=>{n.value=t.TxAnnounced;const T=await L(v);e.logger.debug(o,"aggregate bonded tx announced.",[v,T])},()=>{n.value=t.Failed})>"u"){e.logger.error(o,"open hash lock tx listener failed."),n.value=t.Failed;return}n.value=t.LockAnnounced;const Z=await L(A);e.logger.debug(o,"hashlock tx announced.",[A,Z]),e.logger.debug(o,"aggregate bonded end")}return{title:h,message:m,relatedMosaicIdStr:l,dataBase64:a,progress:n,processedSize:s,writeOnChain:B}});export{t as W,_ as a,de as g,O as o,pe as u};
