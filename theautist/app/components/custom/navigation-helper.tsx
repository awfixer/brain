'use client'

import { usePathname } from 'next/navigation'
import { DynamicBreadcrumb } from './dynamic-breadcrumb'
import { BackButton } from './back-button'

export function NavigationHelper() {
  const pathname = usePathname()
  
  const showBackButton = pathname !== '/'
  const showBreadcrumbs = pathname !== '/'

  return (
    <div className="mb-6">
      {showBackButton && <BackButton />}
      {showBreadcrumbs && <DynamicBreadcrumb />}
    </div>
  )
}