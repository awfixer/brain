'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from './ui/breadcrumb'

const routeLabels: Record<string, string> = {
  '': 'Home',
  'projects': 'Projects',
  'blog': 'Blog',
  'about': 'About',
}

function formatSegment(segment: string): string {
  return routeLabels[segment] || 
    segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
}

export function DynamicBreadcrumb() {
  const pathname = usePathname()
  
  if (pathname === '/') {
    return null
  }

  const segments = pathname.split('/').filter(Boolean)
  
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/')
          const isLast = index === segments.length - 1
          const label = formatSegment(segment)
          
          return (
            <div key={href} className="flex items-center">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}