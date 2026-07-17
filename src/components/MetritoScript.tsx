export function MetritoScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `!(function(t,r,a,c,k,i,n,g){
a="mtrt";c="script";k=window;i=document;n=new URL(location);g=n.searchParams;
if(k[a])return;t="/"+a+"tag.js?id="+(g.get(a+"id")||t);n.host="sst."+n.host.replace(/^w{3}./i,"");
[g.get(a+"url")||n.origin].concat(r).reduce(function(w,x){return w.catch(x?new Promise(function(y,z){
n=i.createElement(c);n.src=x+t;n.async=!0;n.onload=y;n.onerror=z;
g=i.getElementsByTagName(c)[0];g.parentNode.insertBefore(n,g)}):
Promise.reject())},Promise.reject());a=k[a]=function(){a.track?
a.track.apply(a,arguments):a.queue.push(arguments)};a.ver=1;a.queue=[];
k.metrito||(k.metrito=a)})(
"MTC-VZTEP5Z6",["https://api.metrito.com/v2"]);`,
      }}
    />
  );
}
