import { siteConfig } from "@/config/site";

export default function SiteName() {
return (<div className="font-semibold 
bg-gradient-to-r bg-clip-text  text-transparent 
from-red-500 via-indigo-500 to-primary
animate-text
">
{siteConfig.name}
</div>)
}