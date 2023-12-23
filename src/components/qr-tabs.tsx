"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { QRCode } from "./qr-buttons"

interface props{
    metaTitle:string
    metaDescription:string
    ProfilePic:string
}
export function QRCodeTabs() {
  const qrCodes = ["1","2","3"]
  return (
    <Tabs defaultValue="1"  className="flex flex-col ">
      <TabsList className="h-auto overflow-x-auto">
        {qrCodes.map(qr=>(<TabsTrigger 
        value={`${qr}`}>
          <QRCode/>
          </TabsTrigger>))}
      </TabsList>
      {qrCodes.map(qr=>(<TabsContent 
        value={`${qr}`}>
          <QRCode/>
          </TabsContent>))}
    </Tabs>
  )
}


