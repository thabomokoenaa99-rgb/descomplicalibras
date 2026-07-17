import { META_PIXEL_ID } from "@/lib/meta-pixel";

const PIXEL_BOOT = `!function(f,b,e,v,n,t,s){
if(!f.fbq){n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);}
if(!f.__metaPixels)f.__metaPixels={};
if(!f.__metaPixels['${META_PIXEL_ID}']){f.fbq('init','${META_PIXEL_ID}');f.__metaPixels['${META_PIXEL_ID}']=true;}
if(!f.__metaPageView){f.fbq('track','PageView');f.__metaPageView=true;}
}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');`;

export function MetaPixel() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: PIXEL_BOOT }} />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
