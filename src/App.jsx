import './App.css'
import SearchResults from './pages/SearchResults'
import Header from './components/Header/Header'
import { useState, useEffect } from 'react'

function App() {
  const API_BASE = import.meta.env.VITE_API_URL
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function fetchProducts() {
      setLoading(true)
      try {
        const base = API_BASE.replace(/\/$/, '')
        const url = (base ? `${base}/list.php` : '/api/list.php') + (query ? `?search=${encodeURIComponent(query)}` : '')
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const contentType = res.headers.get('content-type') || ''
        if (!contentType.includes('application/json')) {
          const text = await res.text()
          console.error('expected JSON but got:', text.slice(0, 200))
          throw new Error('Invalid JSON response')
        }
        const data = await res.json()
        if (!cancelled) setProducts(data.results || [])
      } catch (err) {
        console.error('fetch products failed', err)
        if (!cancelled) setProducts([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    const id = setTimeout(fetchProducts, 0)
    return () => {
      cancelled = true
      clearTimeout(id)
    }
  }, [query, API_BASE])

  return (
    <div className="content-borders">
      <>
        <Header query={query} setQuery={setQuery} />
        <SearchResults products={products} loading={loading} />
      </>
    </div>
  );
}

export default App
