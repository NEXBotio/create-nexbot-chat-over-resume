"use client"
import '@/styles/image-placeholder.css'

export function QrCodePlaceHolder() {
  return (
      <div>
          {/* <div className="img-placeholder float">
              <div className="dash-border"></div>
          </div> */}

          <div className="img-placeholder float">
              <div className="dash-border">
                  <div className="plus">+</div>
                  <div className="text">Add New</div>
              </div>
          </div>
      </div>
  )
}
export function AltQRCodeButton(){
    return (<div className="w-[180px] h-[180px]"><div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
<div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
    <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
  </div>
  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
  </div>
  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
  </div>
</div>
</div>
<span className="block w-full p-2 text-center font-normal">
</span></div>)}

export  function QRCode(){
return (<div className='flex flex-row'>
  <QrCodePlaceHolder/>
  </div>
)
}