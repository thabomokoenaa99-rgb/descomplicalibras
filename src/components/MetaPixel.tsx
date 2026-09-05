import { META_PIXEL_ID } from "@/lib/meta-pixel";

export function MetaPixel() {
  return (
    <>
      {/* Immediate 1x1 hit so Meta counts Landing Page View without waiting for fbevents.js */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
        width={1}
        height={1}
        fetchPriority="low"
        decoding="async"
        aria-hidden="true"
        style={{ display: "none" }}
      />
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
