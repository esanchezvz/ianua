export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="mt-[60px] flex h-[calc(100vh-60px)] flex-col">{children}</div>
}
