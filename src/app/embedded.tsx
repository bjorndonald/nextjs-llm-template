"use client";
import useAppStore from '@/store';
import { File } from 'lucide-react';
import React from 'react'

const Embedded = () => {
  const tags =  useAppStore(s => s.tags)
    const start = useAppStore(s => s.start)
    const stop = useAppStore(s => s.stop)

  return !!tags.length && (
      <div className="flex items-center text-blue-600 mb-6 mt-2">
          <File className="mr-2 h-4 w-4" />
          <span>{(stop + 1) - start} pages have been embedded</span>
      </div>
  )
}

export default Embedded