
export const metadata = {
  title: 'Blog list',
  description: 'Generated by Hỏi dân it',
}

export default function RootLayout({
  children,
}:{
    children: React.ReactNode
  }) 
{
  return (
    <>
        {children}
    </>
  )
}