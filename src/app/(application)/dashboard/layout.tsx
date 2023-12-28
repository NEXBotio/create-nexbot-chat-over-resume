
export default async function Layout({
  children,
  address
}: {
  children: React.ReactNode,
  address: React.ReactNode
}) {
  return (
    <>
    {address}
    {children}
    </>)
}