'use client'

import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, BarChart3, ArrowLeft, ArrowRight, Activity } from 'lucide-react'

interface Company {
  _id: string
  symbol: string
  name: string
  sector: string
  ltp: number
  percentChange: number
  change: number
  volume?: number
}

const Companydata = () => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [autoScroll, setAutoScroll] = useState(true)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const autoScrollInterval = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get<Company[]>('http://localhost:3001/api/market-watch')
        setCompanies(response.data)
        setError(null)
      } catch (err: any) {
        console.error('Error fetching companies:', err)
        setError(err?.response?.data?.message || err?.message || 'Failed to load company data')
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  useEffect(() => {
    if (autoScroll) {
      autoScrollInterval.current = setInterval(() => {
        if (!scrollRef.current) return
        const container = scrollRef.current
        const maxScrollLeft = container.scrollWidth - container.clientWidth
        const nextScroll = container.scrollLeft + 300

        if (nextScroll >= maxScrollLeft) {
          container.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          container.scrollTo({ left: nextScroll, behavior: 'smooth' })
        }
      }, 4000)
    } else {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current)
      }
    }

    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current)
      }
    }
  }, [autoScroll])

  const scrollBy = (distance: number) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: distance, behavior: 'smooth' })
    setAutoScroll(false)
    // Re-enable auto-scroll after 10 seconds of inactivity
    setTimeout(() => setAutoScroll(true), 10000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading market data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl p-6 text-center">
            <div className="text-red-400 text-xl mb-2">⚠️ Error</div>
            <p className="text-white">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!companies || companies.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-6 text-center">
            <p className="text-white">No companies found</p>
          </div>
        </div>
      </div>
    )
  }

  const gainers = companies.filter(c => c.percentChange > 0).length
  const losers = companies.filter(c => c.percentChange < 0).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header Section */}
      <div className="bg-black/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-400" />
                <p className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Live Market</p>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                Market Watch
              </h1>
              <p className="text-slate-400 text-sm">Top performing companies in real-time</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-emerald-500/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-emerald-500/20">
                <p className="text-xs text-emerald-400">Gainers</p>
                <p className="text-xl font-bold text-emerald-400">+{gainers}</p>
              </div>
              <div className="bg-rose-500/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-rose-500/20">
                <p className="text-xs text-rose-400">Losers</p>
                <p className="text-xl font-bold text-rose-400">{losers}</p>
              </div>
              <div className="bg-white/5 rounded-lg px-4 py-2">
                <p className="text-xs text-slate-400">Listed</p>
                <p className="text-xl font-bold text-white">{companies.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          {/* Auto-scroll Toggle */}
          <div className="absolute -top-12 right-0 flex items-center gap-3 z-10">
            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className={`text-xs px-3 py-1 rounded-full transition-all ${
                autoScroll 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/10 text-slate-400 hover:bg-white/20'
              }`}
            >
              {autoScroll ? 'Auto-scroll ON' : 'Auto-scroll OFF'}
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={() => scrollBy(-320)}
              className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-r-xl p-3 transition-all border border-white/10 border-l-0"
              aria-label="Previous"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={() => scrollBy(320)}
              className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-l-xl p-3 transition-all border border-white/10 border-r-0"
              aria-label="Next"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Cards Container */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-8 scroll-smooth"
            style={{ 
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'thin',
              msOverflowStyle: 'auto'
            }}
            onMouseEnter={() => setAutoScroll(false)}
            onMouseLeave={() => setAutoScroll(true)}
          >
            {companies.map((company, index) => {
              const positive = company.percentChange >= 0
              return (
                <div
                  key={company._id}
                  className="shrink-0 w-[340px] snap-start transform transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-2xl font-bold text-white">
                            {company.symbol}
                          </CardTitle>
                          <CardDescription className="text-slate-300 text-sm mt-1">
                            {company.name}
                          </CardDescription>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          positive 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}>
                          {positive ? <TrendingUp className="h-3 w-3 inline mr-1" /> : <TrendingDown className="h-3 w-3 inline mr-1" />}
                          {positive ? '+' : ''}{company.percentChange.toFixed(2)}%
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* LTP Section */}
                      <div className="bg-black/30 rounded-lg p-3 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-purple-400" />
                            <span className="text-xs text-slate-400 uppercase tracking-wider">Last Traded Price</span>
                          </div>
                          <span className="text-2xl font-bold text-white">
                            ₹{company.ltp.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Change and Volume */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-black/30 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            {positive ? (
                              <TrendingUp className="h-3 w-3 text-emerald-400" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-rose-400" />
                            )}
                            <span className="text-xs text-slate-400">Change</span>
                          </div>
                          <p className={`text-lg font-semibold ${positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {positive ? '+' : ''}{company.change.toFixed(2)}
                          </p>
                        </div>
                        
                        <div className="bg-black/30 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <BarChart3 className="h-3 w-3 text-blue-400" />
                            <span className="text-xs text-slate-400">Volume</span>
                          </div>
                          <p className="text-lg font-semibold text-white">
                            {company.volume ? `${(company.volume / 1000).toFixed(0)}K` : 'N/A'}
                          </p>
                        </div>
                      </div>

                      {/* Sector Tag */}
                      <div className="pt-2 border-t border-white/10">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400 uppercase tracking-wider">Sector</span>
                          <span className="text-sm font-medium text-purple-300 px-2 py-1 bg-purple-500/20 rounded-md">
                            {company.sector}
                          </span>
                        </div>
                      </div>
                    </CardContent>

                    {/* Animated Gradient Border */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${
                      positive 
                        ? 'from-emerald-500/0 via-emerald-500/30 to-emerald-500/0' 
                        : 'from-rose-500/0 via-rose-500/30 to-rose-500/0'
                    } opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                  </Card>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 text-center">
            <p className="text-xs text-slate-400">Avg. Price</p>
            <p className="text-lg font-semibold text-white">
              ₹{(companies.reduce((sum, c) => sum + c.ltp, 0) / companies.length).toFixed(2)}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 text-center">
            <p className="text-xs text-slate-400">Total Volume</p>
            <p className="text-lg font-semibold text-white">
              {(companies.reduce((sum, c) => sum + (c.volume || 0), 0) / 1000000).toFixed(1)}M
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 text-center">
            <p className="text-xs text-slate-400">Top Gainer</p>
            <p className="text-lg font-semibold text-emerald-400">
              +{Math.max(...companies.map(c => c.percentChange)).toFixed(2)}%
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 text-center">
            <p className="text-xs text-slate-400">Top Loser</p>
            <p className="text-lg font-semibold text-rose-400">
              {Math.min(...companies.map(c => c.percentChange)).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Companydata