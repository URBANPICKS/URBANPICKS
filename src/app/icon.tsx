import { ImageResponse } from 'next/og'
 
// আইকনের সাইজ
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// আইকন জেনারেশন ফাংশন
export default function Icon() {
  return new ImageResponse(
    (
      // আইকনের ডিজাইন (CSS দিয়ে)
      <div
        style={{
          fontSize: 20,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#D4AF37', // আমাদের ব্র্যান্ডের সোনালী রং
          borderRadius: '6px',
          fontWeight: 'bold',
          border: '1px solid #333',
        }}
      >
        U
      </div>
    ),
    {
      ...size,
    }
  )
}
