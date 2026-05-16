'use client';

import { createChart, ColorType, CandlestickSeries, IChartApi } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';

interface ChartData {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
}

export const StockChart = ({ symbol = "NICA" }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPrice, setCurrentPrice] = useState<number | null>(null);
    const [priceChange, setPriceChange] = useState<number | null>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        // 1. Initialize Chart with Purple Theme
        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: '#0f0f23' },
                textColor: '#c4b5fd',
            },
            grid: {
                vertLines: { color: '#1e1b4b' },
                horzLines: { color: '#1e1b4b' },
            },
            width: chartContainerRef.current.clientWidth,
            height: 500,
            timeScale: {
                timeVisible: true,
                borderColor: '#4c1d95',
                tickMarkFormatter: (time: number) => {
                    const date = new Date(time * 1000);
                    return date.toLocaleDateString();
                },
            },
            crosshair: {
                mode: 0,
                vertLine: {
                    color: '#8b5cf6',
                    width: 1,
                    style: 2,
                },
                horzLine: {
                    color: '#8b5cf6',
                    width: 1,
                    style: 2,
                },
            },
        });
        
        chartRef.current = chart;

        // 2. Add Candlestick Series with Purple Accents
        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#10b981',
            downColor: '#ef4444',
            borderUpColor: '#34d399',
            borderDownColor: '#f87171',
            wickUpColor: '#34d399',
            wickDownColor: '#f87171',
        });

        // 3. Fetch and Set Data
        const fetchChartData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`http://localhost:3001/api/charts/${symbol}`);
                
                const formattedData = data
                    .map((item: any) => ({
                        time: item.date.split('T')[0],
                        open: item.open,
                        high: item.high,
                        low: item.low,
                        close: item.close
                    }))
                    .sort((a: any, b: any) => new Date(a.time).getTime() - new Date(b.time).getTime());

                candleSeries.setData(formattedData);
                chart.timeScale().fitContent();
                
                // Set current price and change
                if (formattedData.length > 0) {
                    const lastCandle = formattedData[formattedData.length - 1];
                    const previousCandle = formattedData[formattedData.length - 2];
                    setCurrentPrice(lastCandle.close);
                    if (previousCandle) {
                        const change = ((lastCandle.close - previousCandle.close) / previousCandle.close) * 100;
                        setPriceChange(change);
                    }
                }
                
                setLoading(false);
            } catch (error) {
                console.error('Fetch error:', error);
                setLoading(false);
            }
        };

        fetchChartData();

        // 4. Robust Resize Handling using ResizeObserver
        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (let entry of entries) {
                const { width } = entry.contentRect;
                if (chartRef.current) {
                    chartRef.current.applyOptions({ width });
                }
            }
        };

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(chartContainerRef.current);

        return () => {
            resizeObserver.disconnect();
            chart.remove();
        };
    }, [symbol]);

    const isPositive = priceChange !== null && priceChange >= 0;

    return (
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl border border-purple-500/20 overflow-hidden shadow-2xl">
            {/* Chart Header */}
            <div className="bg-black/50 backdrop-blur-sm px-6 py-4 border-b border-purple-500/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-purple-400" />
                            <p className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
                                Live Chart
                            </p>
                        </div>
                        <div className="h-6 w-px bg-purple-500/20"></div>
                        <div>
                            <h3 className="text-white font-bold text-lg">{symbol}</h3>
                            {currentPrice && (
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-2xl font-bold text-white">
                                        ₹{currentPrice.toFixed(2)}
                                    </span>
                                    {priceChange !== null && (
                                        <span className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                            {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-emerald-400">Live</span>
                        </div>
                        <div className="w-px h-4 bg-purple-500/20"></div>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-xs text-purple-400">Candlestick</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart Container */}
            <div className="relative p-4">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900/95 z-10 rounded-xl">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                            <p className="text-white text-lg">Loading {symbol} chart data...</p>
                        </div>
                    </div>
                )}
                <div 
                    ref={chartContainerRef} 
                    className="rounded-xl overflow-hidden"
                    style={{ width: '100%' }}
                />
            </div>

            {/* Chart Footer Stats */}
            <div className="bg-black/30 backdrop-blur-sm px-6 py-3 border-t border-purple-500/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Timeframe</p>
                        <p className="text-sm font-semibold text-white">Daily</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Chart Type</p>
                        <p className="text-sm font-semibold text-white">Candlestick</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Exchange</p>
                        <p className="text-sm font-semibold text-white">NEPSE</p>
                    </div>
                </div>
            </div>
        </div>
    );
};