import Link from 'next/link'
import React from 'react'
import cities from '../lib/city.list.json'
import Router from 'next/router'
import Loading from './Loading'

export default function Search({ placeholder }) {

  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState([])
  const [loading, setLoading] = React.useState(true)


  React.useEffect(() => {
    const clearQuery = () => setQuery('')

    Router.events.on('routeChangeComplete', clearQuery, setLoading(false))
    Router.events.on('routeChangeStart', () => setLoading(true))

    return () => {
      Router.events.off('routeChangeComplete', clearQuery)
      Router.events.off('routeChangeStart', () => setLoading(true))
    }
  }, [])

  const onChange = (e) => {
    setQuery(e.target.value)

    let matchingCities = []

    if (query.length > 3) {
      for (let city of cities) {
        if (matchingCities.length >= 5) break

        const match = city.name.toLowerCase().startsWith(query.toLowerCase())

        if (match) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, '-')}-${city.id}`
          }
          matchingCities.push(cityData)
        }
      }

    }
    setResults(matchingCities)
  }

  if (loading) {
    return <Loading />
  }


  return (
    <div className='container mx-auto'>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={query}
          onChange={onChange}
          placeholder={placeholder ? placeholder : 'Search for a city'}
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="relative w-full">
        {query.length > 3 && (
          <div className="absolute z-20 top-0 left-0 w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg divide-y divide-dotted divide-gray-300">
            {results.length > 0 ? (
              results.map((result) => (
                <Link key={result.slug} className="flex items-center justify-between p-2.5" href={`/location/${result.slug}`}>
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{result.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">{result.country}</div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{result.coord.lat}, {result.coord.lon}</div>
                </Link>
              ))
            ) : (
              <div className="flex items-center justify-between p-2.5">
                <div className="text-sm font-medium text-gray-900 dark:text-white text-center w-full">
                  No results found
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
