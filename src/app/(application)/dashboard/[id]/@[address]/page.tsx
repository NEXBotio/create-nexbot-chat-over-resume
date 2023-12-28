
import React, { Suspense } from "react"
import AddressSetter from '@/components/address-setter'
import PreviewArea from '@/components/preview-area'
import MetaDataSetter from "@/components/metadata-setter"
import UploadImage from "@/components/upload-image"
import {QRCodeTabs} from "@/components/qr-tabs"
import { Separator } from "@/components/ui/separator"
import { createSupaServerClient } from "@/lib/supabase-server"



export default function Page({params}: {params:{id: string}}) {

  return (
  <div 
  className="" 
  >
    <AddressSetter />
    <MetaDataSetter/>
    <UploadImage/>

    <PreviewArea/>
    <div className="p-2">
    <h3 className="text-2xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">QR Codes</h3>
    <Separator className="mt-2" />
    </div>
    <Suspense fallback={<div>Loading...</div>}>
    <QRCodeTabs/>
    </Suspense>

  </div>)
}
