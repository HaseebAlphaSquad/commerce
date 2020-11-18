import cn from 'classnames'
import { useState } from 'react'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import getSiteInfo from '@bigcommerce/storefront-data-hooks/api/operations/get-site-info'
import useSearch from '@bigcommerce/storefront-data-hooks/products/use-search'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Container, Grid, Skeleton } from '@components/ui'

import rangeMap from '@lib/range-map'
import getSlug from '@lib/get-slug'
import {
  filterQuery,
  getCategoryPath,
  getDesignerPath,
  useSearchMeta,
} from '@lib/search'
  
export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  const { categories, brands } = await getSiteInfo({ config, preview })

  return {
    props: { pages, categories, brands },
  }
}

const SORT = Object.entries({
  'latest-desc': 'Latest arrivals',
  'trending-desc': 'Trending',
  'price-asc': 'Price: Low to high',
  'price-desc': 'Price: High to low',
})



export default function Search({
  categories,
  brands,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  
  const router = useRouter()
  const { asPath } = router
  const { q, sort } = router.query
  const whiteHeader = true
  const [open, setOpen] = useState(false);
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected
  const query = filterQuery({ sort })

  const { pathname, category, brand } = useSearchMeta(asPath)
  const activeCategory = categories.find(
    (cat) => getSlug(cat.path) === category
  )
  const activeBrand = brands.find(
    (b) => getSlug(b.node.path) === `brands/${brand}`
  )?.node

  const { data } = useSearch({
    search: typeof q === 'string' ? q : '',
    categoryId: activeCategory?.entityId,
    brandId: activeBrand?.entityId,
    sort: typeof sort === 'string' ? sort : '',
  })

  return (
    <Container>
      <div className="grid grid-cols-12 gap-4 mt-3 mb-20">
        <div className="col-span-2">
          {/* <ul className="mb-10 pl-8 mx-auto">
            <li className="py-1 text-base font-bold tracking-wide mt-5">
              <Link href={{ pathname: getCategoryPath('', brand), query }}>
                <a>Categories</a>
              </Link>
            </li>
            {categories.map((cat) => (
              <li
                key={cat.path}
                className={cn('py-1 text-accents-8', {
                  underline: activeCategory?.entityId === cat.entityId,
                })}
              >
                <Link
                  href={{
                    pathname: getCategoryPath(cat.path, brand),
                    query,
                  }}
                >
                  <a>{cat.name}</a>
                </Link>
              </li>
            ))}
          </ul>
          <ul>
            <li className="py-1 text-base font-bold tracking-wide">
              <Link href={{ pathname: getDesignerPath('', category), query }}>
                <a>All Designers</a>
              </Link>
            </li>
            {brands.flatMap(({ node }) => (
              <li
                key={node.path} 
                className={cn('py-1 text-accents-8', {
                  underline: activeBrand?.entityId === node.entityId,
                })}
              >
                <Link
                  href={{
                    pathname: getDesignerPath(node.path, category),
                    query,
                  }}
                >
                  <a>{node.name}</a>
                </Link>
              </li>
            ))}
          </ul> */}
          <div className="hidden w-64 mt-10 bg-white md:h-full flex-col justify-between sm:flex pb-12">
                <div className="px-8">
                    <h1 className="font-semibold montserrat">CATEGORIES</h1>
                    <ul className="mt-5 montserrat">
                        <li className="pb-1 flex w-full justify-between text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">TOPS</span>
                            </div>
                        </li>
                        <li className="pb-1 flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">TEES AND TANKS</span>
                            </div>
                        </li>
                        <li className="pb-1 flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">SHIRTS</span>
                            </div>
                        </li>
                        <li className="pb-1 flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">DRESSES</span>
                            </div>
                        </li>
                        <li className="pb-1 flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">JACKETS</span>
                            </div>
                        </li>
                        <li className="pb-1 flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">JUMPSUITS</span>
                            </div>
                        </li>
                        <li className="pb-1 flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">BOTTOMS</span>
                            </div>
                        </li>
                        <li className="pb-1 flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">INTIMATES</span>
                            </div>
                        </li>
                        <li className="pb-1 flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">SHORTS</span>
                            </div>
                        </li>
                        <li className="pb-1 flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">JEANS</span>
                            </div>
                        </li>
                        <li className="pb-1 flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">SKIRTS</span>
                            </div>
                        </li>
                        <li className="pb-1 flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">SALE</span>
                            </div>
                        </li>
                        <li className="pb-1 flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">SHOP ALL</span>
                            </div>
                        </li>
                    </ul>
                    <h1 className="text-gray-600 pt-3 pb-3">FILTERS</h1>
                    <ul className="montserrat mt-2">
                        <li className="pb-1 flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">+ SIZE</span>
                            </div>
                        </li>
                        <li className="pb-1 flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">+ PRICE</span>
                            </div>
                        </li>
                        <li className="pb-1 flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">+ COLOR</span>
                            </div>
                        </li>
                        <li className="pb-1 flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">+ FABRIC</span>
                            </div>
                        </li>
                    </ul>
                    <h1 className="montserrat pt-5 text-sm">SORT: NEWEST</h1>
                </div>
            </div>
            <div className="absolute bg-white shadow md:h-full flex-col justify-between sm:hidden pb-12 transition duration-150 ease-in-out" id="mobile-nav">
                <div className="h-10 w-10 bg-gray-700 absolute left-0 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer" id="mobile-toggler">
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setOpen(!open)} className="icon icon-tabler icon-tabler-adjustments" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFFFFF" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx={6} cy={10} r={2} />
                        <line x1={6} y1={4} x2={6} y2={8} />
                        <line x1={6} y1={12} x2={6} y2={20} />
                        <circle cx={12} cy={16} r={2} />
                        <line x1={12} y1={4} x2={12} y2={14} />
                        <line x1={12} y1={18} x2={12} y2={20} />
                        <circle cx={18} cy={7} r={2} />
                        <line x1={18} y1={4} x2={18} y2={5} />
                        <line x1={18} y1={9} x2={18} y2={20} />
                    </svg>
                </div>

                {open ? <div className="px-8 p-5 m-5">
                    <ul className="mt-12 justify-center">
                    <div className="h-16 pt-4 w-full flex items-center mx-5">
                        <Link href="/"><a>
                        <div className="mr-10 flex items-center">
                            <svg width="150" height="80" viewBox="0 0 322 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M109.425 30.5V49.625L93.765 30.5H87.735V62H94.935V42.875L110.64 62H116.625V30.5H109.425ZM131.323 56.15V48.86H145.948V43.19H131.323V36.35H147.883V30.5H124.078V62H148.468V56.15H131.323ZM182.221 62L170.476 45.71L181.456 30.5H173.581L166.471 40.715L159.226 30.5H150.946L162.016 45.98L150.361 62H158.731L166.201 51.065L173.806 62H182.221ZM191.247 62H198.537V36.44H208.617V30.5H181.167V36.44H191.247V62Z" fill={whiteHeader ? "#000000" : "#FFFFFF"}/>
                            <path d="M227.615 62.27C232.25 62.27 236.39 60.695 239.18 57.635L237.065 55.52C234.5 58.175 231.35 59.3 227.75 59.3C220.145 59.3 214.43 53.72 214.43 46.25C214.43 38.78 220.145 33.2 227.75 33.2C231.35 33.2 234.5 34.325 237.065 36.935L239.18 34.82C236.39 31.76 232.25 30.23 227.66 30.23C218.165 30.23 211.145 37.025 211.145 46.25C211.145 55.475 218.165 62.27 227.615 62.27ZM259.389 62.27C268.839 62.27 275.904 55.475 275.904 46.25C275.904 37.025 268.839 30.23 259.389 30.23C249.849 30.23 242.829 37.07 242.829 46.25C242.829 55.43 249.849 62.27 259.389 62.27ZM259.389 59.3C251.784 59.3 246.114 53.765 246.114 46.25C246.114 38.735 251.784 33.2 259.389 33.2C266.949 33.2 272.574 38.735 272.574 46.25C272.574 53.765 266.949 59.3 259.389 59.3ZM313.338 30.5L299.793 53.855L286.113 30.5H283.368V62H286.563V36.935L298.938 57.995H300.513L312.888 36.8V62H316.083V30.5H313.338Z" fill={whiteHeader ? "#000000" : "#A5A5A5"}/>
                            <path d="M28.2279 16.5817C28.246 14.7051 29.0077 12.9124 30.3458 11.5967C31.684 10.281 33.4894 9.54977 35.366 9.56347H36.2644C38.141 9.54977 39.9464 10.281 41.2846 11.5967C42.6227 12.9124 43.3844 14.7051 43.4025 16.5817V19.0476H45.2994V16.5817C45.2807 14.2022 44.319 11.9273 42.6252 10.256C40.9314 8.58476 38.6439 7.65353 36.2644 7.66664H35.366C32.9865 7.65353 30.699 8.58476 29.0052 10.256C27.3115 11.9273 26.3497 14.2022 26.3311 16.5817V19.0476H28.2279V16.5817Z" fill={whiteHeader ? "#000000" : "#FFFFFF"}/>
                            <path d="M14.0021 26.6346C14.5259 26.6346 14.9505 26.21 14.9505 25.6862C14.9505 25.1624 14.5259 24.7378 14.0021 24.7378C13.4783 24.7378 13.0537 25.1624 13.0537 25.6862C13.0537 26.21 13.4783 26.6346 14.0021 26.6346Z" fill={whiteHeader ? "#000000" : "#A5A5A5"}/>
                            <path d="M21.59 26.6346C22.1138 26.6346 22.5384 26.21 22.5384 25.6862C22.5384 25.1624 22.1138 24.7378 21.59 24.7378C21.0662 24.7378 20.6416 25.1624 20.6416 25.6862C20.6416 26.21 21.0662 26.6346 21.59 26.6346Z" fill={whiteHeader ? "#000000" : "#A5A5A5"}/>
                            <path d="M17.7951 26.6346C18.3189 26.6346 18.7435 26.21 18.7435 25.6862C18.7435 25.1624 18.3189 24.7378 17.7951 24.7378C17.2713 24.7378 16.8467 25.1624 16.8467 25.6862C16.8467 26.21 17.2713 26.6346 17.7951 26.6346Z" fill={whiteHeader ? "#000000" : "#A5A5A5"}/>
                            <path d="M40.67 54.1577C40.8803 53.9056 41.0216 53.6032 41.0801 53.2802C41.1386 52.9571 41.1122 52.6245 41.0035 52.3147C40.8949 52.0049 40.7077 51.7286 40.4603 51.5128C40.2129 51.297 39.9137 51.1492 39.592 51.0837L33.8231 49.9092C33.4954 49.8425 33.1559 49.8636 32.8389 49.9704C32.522 50.0772 32.239 50.2659 32.0185 50.5173C31.798 50.7688 31.6479 51.0741 31.5834 51.4022C31.519 51.7304 31.5424 52.0698 31.6514 52.3859L33.4357 57.5637C33.5604 57.9257 33.7918 58.2415 34.0995 58.4696C34.4071 58.6976 34.7765 58.8272 35.1592 58.8412C35.1826 58.8421 35.2061 58.8425 35.2294 58.8425C35.5047 58.8425 35.7767 58.7825 36.0265 58.6668C36.2763 58.551 36.4979 58.3823 36.676 58.1723L37.5533 58.9101C37.9172 59.2162 38.3829 59.3744 38.858 59.3534C39.3331 59.3324 39.783 59.1336 40.1185 58.7966L41.428 57.481C41.6131 57.295 41.7577 57.0725 41.8524 56.8278C41.9472 56.583 41.9902 56.3212 41.9785 56.059C41.9669 55.7967 41.901 55.5398 41.785 55.3043C41.6689 55.0689 41.5053 54.8601 41.3044 54.6911L40.67 54.1577ZM38.7741 57.4584L36.0076 55.1318L35.229 56.9457L33.4447 51.7679L39.2136 52.9424L37.317 53.8164L40.0836 56.1429L38.7741 57.4584Z" fill={whiteHeader ? "#000000" : "#A5A5A5"}/>
                            <path d="M28.2278 34.6958H16.8469C16.5953 34.6958 16.3541 34.7957 16.1762 34.9736C15.9984 35.1515 15.8985 35.3927 15.8984 35.6442V47.0252C15.8985 47.2767 15.9984 47.518 16.1762 47.6958C16.3541 47.8737 16.5953 47.9736 16.8469 47.9736H28.2278C28.4794 47.9736 28.7206 47.8737 28.8985 47.6958C29.0763 47.518 29.1762 47.2767 29.1763 47.0252V35.6442C29.1762 35.3927 29.0763 35.1515 28.8985 34.9736C28.7206 34.7957 28.4794 34.6958 28.2278 34.6958ZM27.2794 46.0768H17.7953V36.5926H27.2794V46.0768Z" fill={whiteHeader ? "#000000" : "#A5A5A5"}/>
                            <path d="M54.5467 34.6958H32.259C32.0074 34.6958 31.7662 34.7957 31.5883 34.9736C31.4105 35.1514 31.3105 35.3927 31.3105 35.6442C31.3105 35.8958 31.4105 36.137 31.5883 36.3148C31.7662 36.4927 32.0074 36.5926 32.259 36.5926H54.5467C54.7983 36.5926 55.0395 36.4927 55.2174 36.3148C55.3952 36.137 55.4951 35.8958 55.4951 35.6442C55.4951 35.3927 55.3952 35.1514 55.2174 34.9736C55.0395 34.7957 54.7983 34.6958 54.5467 34.6958Z" fill={whiteHeader ? "#000000" : "#A5A5A5"}/>
                            <path d="M54.5467 38.4897H32.259C32.0074 38.4897 31.7662 38.5897 31.5883 38.7675C31.4105 38.9454 31.3105 39.1866 31.3105 39.4382C31.3105 39.6897 31.4105 39.9309 31.5883 40.1088C31.7662 40.2867 32.0074 40.3866 32.259 40.3866H54.5467C54.7983 40.3866 55.0395 40.2867 55.2174 40.1088C55.3952 39.9309 55.4951 39.6897 55.4951 39.4382C55.4951 39.1866 55.3952 38.9454 55.2174 38.7675C55.0395 38.5897 54.7983 38.4897 54.5467 38.4897Z" fill={whiteHeader ? "#000000" : "#A5A5A5"}/>
                            <path d="M54.5467 42.2837H32.259C32.0074 42.2837 31.7662 42.3836 31.5883 42.5615C31.4105 42.7393 31.3105 42.9806 31.3105 43.2321C31.3105 43.4836 31.4105 43.7249 31.5883 43.9027C31.7662 44.0806 32.0074 44.1805 32.259 44.1805H54.5467C54.7983 44.1805 55.0395 44.0806 55.2174 43.9027C55.3952 43.7249 55.4951 43.4836 55.4951 43.2321C55.4951 42.9806 55.3952 42.7393 55.2174 42.5615C55.0395 42.3836 54.7983 42.2837 54.5467 42.2837Z" fill={whiteHeader ? "#000000" : "#A5A5A5"}/>
                            <path d="M54.5467 46.0771H32.259C32.0074 46.0771 31.7662 46.1771 31.5883 46.3549C31.4105 46.5328 31.3105 46.774 31.3105 47.0256C31.3105 47.2771 31.4105 47.5183 31.5883 47.6962C31.7662 47.8741 32.0074 47.974 32.259 47.974H54.5467C54.7983 47.974 55.0395 47.8741 55.2174 47.6962C55.3952 47.5183 55.4951 47.2771 55.4951 47.0256C55.4951 46.774 55.3952 46.5328 55.2174 46.3549C55.0395 46.1771 54.7983 46.0771 54.5467 46.0771Z" fill={whiteHeader ? "#000000" : "#A5A5A5"}/>
                            <path d="M52.0117 70.2617H48.0721C47.8336 70.2808 47.6112 70.389 47.4489 70.5648C47.2867 70.7405 47.1966 70.9709 47.1966 71.2101C47.1966 71.4493 47.2867 71.6797 47.4489 71.8555C47.6112 72.0312 47.8336 72.1394 48.0721 72.1585H52.0117C52.2501 72.1394 52.4726 72.0312 52.6348 71.8555C52.797 71.6797 52.8871 71.4493 52.8871 71.2101C52.8871 70.9709 52.797 70.7405 52.6348 70.5648C52.4726 70.389 52.2501 70.2808 52.0117 70.2617ZM23.5592 70.2617H19.6196C19.3812 70.2808 19.1587 70.389 18.9965 70.5648C18.8342 70.7405 18.7441 70.9709 18.7441 71.2101C18.7441 71.4493 18.8342 71.6797 18.9965 71.8555C19.1587 72.0312 19.3812 72.1394 19.6196 72.1585H23.5592C23.7976 72.1394 24.0201 72.0312 24.1823 71.8555C24.3446 71.6797 24.4347 71.4493 24.4347 71.2101C24.4347 70.9709 24.3446 70.7405 24.1823 70.5648C24.0201 70.389 23.7976 70.2808 23.5592 70.2617ZM45.2998 70.2617H26.3315C26.0799 70.2617 25.8387 70.3616 25.6608 70.5395C25.483 70.7174 25.3831 70.9586 25.3831 71.2101C25.3831 71.4617 25.483 71.7029 25.6608 71.8808C25.8387 72.0586 26.0799 72.1585 26.3315 72.1585H33.8903V73.107H30.1251C29.8736 73.107 29.6324 73.2069 29.4545 73.3847C29.2766 73.5626 29.1767 73.8038 29.1767 74.0554C29.1767 74.3069 29.2766 74.5482 29.4545 74.726C29.6324 74.9039 29.8736 75.0038 30.1251 75.0038H41.9803C42.2319 75.0038 42.4731 74.9039 42.651 74.726C42.8288 74.5482 42.9287 74.3069 42.9287 74.0554C42.9287 73.8038 42.8288 73.5626 42.651 73.3847C42.4731 73.2069 42.2319 73.107 41.9803 73.107H37.7409V72.1585H45.2998C45.5513 72.1585 45.7926 72.0586 45.9704 71.8808C46.1483 71.7029 46.2482 71.4617 46.2482 71.2101C46.2482 70.9586 46.1483 70.7174 45.9704 70.5395C45.7926 70.3616 45.5513 70.2617 45.2998 70.2617Z" fill={whiteHeader ? "#000000" : "#A5A5A5"}/>
                            <path d="M67.4555 66.4681H60.1545C60.4557 65.9324 60.6181 65.3298 60.6271 64.7153L65.2103 24.7596C65.2145 24.7238 65.2166 24.6878 65.2166 24.6517C65.2163 23.6695 64.8263 22.7275 64.1323 22.0324C63.4383 21.3373 62.4969 20.946 61.5146 20.9442H10.1168C9.13457 20.946 8.19317 21.3373 7.49915 22.0324C6.80512 22.7275 6.41517 23.6695 6.41484 24.6517C6.41483 24.6878 6.41691 24.7238 6.42109 24.7596L11.0043 64.7153C11.0133 65.3298 11.1757 65.9324 11.4769 66.4681H4.17595C4.04103 66.4505 3.9039 66.4619 3.77371 66.5014C3.64353 66.541 3.52329 66.608 3.42103 66.6977C3.31877 66.7875 3.23685 66.898 3.18072 67.022C3.12459 67.146 3.09556 67.2805 3.09556 67.4165C3.09556 67.5526 3.12459 67.6871 3.18072 67.8111C3.23685 67.935 3.31877 68.0456 3.42103 68.1353C3.52329 68.2251 3.64353 68.292 3.77371 68.3316C3.9039 68.3712 4.04103 68.3826 4.17595 68.3649H67.4555C67.5904 68.3826 67.7275 68.3712 67.8577 68.3316C67.9879 68.292 68.1081 68.2251 68.2104 68.1353C68.3127 68.0456 68.3946 67.935 68.4507 67.8111C68.5069 67.6871 68.5359 67.5526 68.5359 67.4165C68.5359 67.2805 68.5069 67.146 68.4507 67.022C68.3946 66.898 68.3127 66.7875 68.2104 66.6977C68.1081 66.608 67.9879 66.541 67.8577 66.5014C67.7275 66.4619 67.5904 66.4505 67.4555 66.4681ZM8.31236 24.6031C8.32474 24.1323 8.52014 23.6849 8.85706 23.3559C9.19398 23.0269 9.64589 22.8422 10.1168 22.841H61.5146C61.9855 22.8422 62.4375 23.0269 62.7744 23.3559C63.1113 23.6849 63.3067 24.1323 63.3191 24.6031L62.8685 28.5315H8.76298L8.31236 24.6031ZM14.7058 66.4681C14.2265 66.4669 13.7673 66.2755 13.4288 65.936C13.0904 65.5966 12.9005 65.1367 12.9007 64.6574C12.9007 64.6214 12.8986 64.5853 12.8944 64.5495L8.98055 30.4283H62.6509L58.737 64.5495C58.7328 64.5853 58.7308 64.6214 58.7308 64.6574C58.731 65.1367 58.541 65.5966 58.2026 65.936C57.8642 66.2755 57.405 66.4669 56.9256 66.4681H14.7058ZM25.3831 3.79366C25.6645 3.79366 25.9396 3.71023 26.1735 3.55391C26.4075 3.39759 26.5898 3.1754 26.6975 2.91545C26.8052 2.6555 26.8333 2.36946 26.7784 2.0935C26.7235 1.81754 26.5881 1.56405 26.3891 1.36509C26.1901 1.16613 25.9366 1.03064 25.6607 0.975751C25.3847 0.920859 25.0987 0.949031 24.8387 1.05671C24.5788 1.16438 24.3566 1.34672 24.2003 1.58067C24.044 1.81462 23.9605 2.08967 23.9605 2.37104C23.961 2.74821 24.111 3.10981 24.3777 3.37651C24.6444 3.64321 25.006 3.79323 25.3831 3.79366ZM25.3831 1.65973C25.5238 1.65973 25.6614 1.70145 25.7783 1.77961C25.8953 1.85776 25.9865 1.96886 26.0403 2.09883C26.0942 2.22881 26.1082 2.37183 26.0808 2.50981C26.0533 2.64779 25.9856 2.77453 25.8861 2.87401C25.7866 2.97349 25.6599 3.04124 25.5219 3.06868C25.3839 3.09613 25.2409 3.08204 25.1109 3.02821C24.981 2.97437 24.8699 2.8832 24.7917 2.76622C24.7136 2.64925 24.6718 2.51172 24.6718 2.37104C24.672 2.18244 24.747 2.00163 24.8804 1.86827C25.0137 1.73491 25.1946 1.65991 25.3831 1.65973ZM71.0516 30.9025C70.864 30.9025 70.6806 30.9582 70.5247 31.0624C70.3687 31.1666 70.2472 31.3147 70.1754 31.488C70.1036 31.6613 70.0848 31.852 70.1214 32.036C70.158 32.22 70.2483 32.3889 70.381 32.5216C70.5136 32.6542 70.6826 32.7445 70.8666 32.7811C71.0505 32.8177 71.2412 32.799 71.4145 32.7272C71.5878 32.6554 71.736 32.5338 71.8402 32.3779C71.9444 32.2219 72 32.0385 72 31.851C71.9997 31.5995 71.8997 31.3584 71.7219 31.1806C71.5441 31.0028 71.303 30.9028 71.0516 30.9025ZM71.0516 32.3252C70.9578 32.3252 70.8661 32.2973 70.7881 32.2452C70.7102 32.1931 70.6494 32.1191 70.6135 32.0324C70.5776 31.9458 70.5682 31.8504 70.5865 31.7584C70.6048 31.6664 70.65 31.582 70.7163 31.5156C70.7826 31.4493 70.8671 31.4042 70.9591 31.3859C71.0511 31.3676 71.1464 31.3769 71.2331 31.4128C71.3197 31.4487 71.3938 31.5095 71.4459 31.5875C71.498 31.6655 71.5258 31.7572 71.5258 31.851C71.5257 31.9767 71.4757 32.0972 71.3868 32.1861C71.2979 32.275 71.1773 32.325 71.0516 32.3252ZM49.2748 2.84525C49.0872 2.84525 48.9038 2.90087 48.7478 3.00508C48.5919 3.1093 48.4703 3.25742 48.3985 3.43072C48.3267 3.60402 48.308 3.79471 48.3446 3.97869C48.3812 4.16266 48.4715 4.33166 48.6041 4.46429C48.7368 4.59693 48.9058 4.68726 49.0897 4.72385C49.2737 4.76045 49.4644 4.74167 49.6377 4.66988C49.811 4.5981 49.9591 4.47654 50.0633 4.32057C50.1675 4.16461 50.2232 3.98124 50.2232 3.79366C50.2229 3.54221 50.1229 3.30115 49.9451 3.12335C49.7673 2.94555 49.5262 2.84553 49.2748 2.84525ZM49.2748 4.26787C49.181 4.26787 49.0893 4.24006 49.0113 4.18795C48.9333 4.13584 48.8725 4.06178 48.8366 3.97513C48.8008 3.88848 48.7914 3.79314 48.8097 3.70115C48.828 3.60916 48.8731 3.52467 48.9394 3.45835C49.0058 3.39203 49.0903 3.34686 49.1822 3.32857C49.2742 3.31027 49.3696 3.31966 49.4562 3.35555C49.5429 3.39144 49.6169 3.45222 49.669 3.53021C49.7211 3.60819 49.749 3.69987 49.749 3.79366C49.7488 3.91939 49.6988 4.03994 49.6099 4.12884C49.521 4.21774 49.4005 4.26774 49.2748 4.26787ZM65.3747 0C65.1871 0 65.0037 0.0556237 64.8478 0.159837C64.6918 0.26405 64.5702 0.412172 64.4984 0.585473C64.4267 0.758773 64.4079 0.949468 64.4445 1.13344C64.4811 1.31742 64.5714 1.48641 64.704 1.61905C64.8367 1.75169 65.0057 1.84201 65.1896 1.87861C65.3736 1.9152 65.5643 1.89642 65.7376 1.82464C65.9109 1.75285 66.059 1.63129 66.1632 1.47533C66.2675 1.31936 66.3231 1.13599 66.3231 0.948416C66.3228 0.696968 66.2228 0.455902 66.045 0.278102C65.8672 0.100302 65.6261 0.000287414 65.3747 0ZM65.3747 1.42262C65.2809 1.42262 65.1892 1.39481 65.1112 1.3427C65.0332 1.2906 64.9725 1.21654 64.9366 1.12989C64.9007 1.04324 64.8913 0.94789 64.9096 0.855902C64.9279 0.763915 64.973 0.679419 65.0394 0.6131C65.1057 0.546781 65.1902 0.501617 65.2822 0.48332C65.3741 0.465022 65.4695 0.474413 65.5561 0.510305C65.6428 0.546197 65.7169 0.606977 65.769 0.68496C65.8211 0.762943 65.8489 0.854626 65.8489 0.948416C65.8487 1.07414 65.7987 1.19469 65.7098 1.28359C65.6209 1.3725 65.5004 1.4225 65.3747 1.42262ZM1.89683 23.7894C1.89683 23.6018 1.84121 23.4185 1.73699 23.2625C1.63278 23.1065 1.48466 22.985 1.31136 22.9132C1.13806 22.8414 0.947364 22.8226 0.763389 22.8592C0.579415 22.8958 0.410423 22.9862 0.277785 23.1188C0.145147 23.2514 0.0548188 23.4204 0.018224 23.6044C-0.0183709 23.7884 0.00041093 23.9791 0.0721943 24.1524C0.143978 24.3257 0.265539 24.4738 0.421505 24.578C0.577471 24.6822 0.760837 24.7378 0.948416 24.7378C1.19986 24.7375 1.44093 24.6375 1.61873 24.4597C1.79653 24.2819 1.89654 24.0409 1.89683 23.7894ZM0.474208 23.7894C0.474208 23.6956 0.50202 23.6039 0.554127 23.526C0.606233 23.448 0.680294 23.3872 0.766944 23.3513C0.853595 23.3154 0.948942 23.306 1.04093 23.3243C1.13292 23.3426 1.21741 23.3878 1.28373 23.4541C1.35005 23.5204 1.39521 23.6049 1.41351 23.6969C1.43181 23.7889 1.42242 23.8842 1.38653 23.9709C1.35064 24.0575 1.28986 24.1316 1.21187 24.1837C1.13389 24.2358 1.04221 24.2636 0.948416 24.2636C0.822687 24.2635 0.702143 24.2135 0.613239 24.1246C0.524335 24.0357 0.474334 23.9151 0.474208 23.7894Z" fill={whiteHeader ? "#000000" : "#FFFFFF"}/>
                            </svg>
                    </div></a></Link>
                    </div>
                        <li className="flex w-full justify-between text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">TOPS</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">TEES AND TANKS</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">SHIRTS</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">DRESSES</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">JACKETS</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center mb-2">
                            <div className="flex items-center">
                                <span className="text-sm">JUMPSUITS</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center">
                            <div className="flex items-center">
                                <span className="text-sm">BOTTOMS</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center">
                            <div className="flex items-center">
                                <span className="text-sm">INTIMATES</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center">
                            <div className="flex items-center">
                                <span className="text-sm">SHORTS</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center">
                            <div className="flex items-center">
                                <span className="text-sm">JEANS</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center">
                            <div className="flex items-center">
                                <span className="text-sm">SKIRTS</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center">
                            <div className="flex items-center">
                                <span className="text-sm">SALE</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-black hover:text-gray-700 cursor-pointer items-center">
                            <div className="flex items-center">
                                <span className="text-sm">SHOP ALL</span>
                            </div>
                        </li>
                    </ul>
                </div> : ""}
            </div>


            
        </div>
        <div className="col-span-10">
          <div className="pt-6"><h1 className="text-4xl">COLLECTIONS</h1></div>
          {(q || activeCategory || activeBrand) && (
            <div className="mb-12 transition ease-in duration-75">
              {data ? (
                <>
                  <span
                    className={cn('animated', {
                      fadeIn: data.found,
                      hidden: !data.found,
                    })}
                  >
                    Showing {data.products.length} results{' '}
                    {q && (
                      <>
                        for "<strong>{q}</strong>"
                      </>
                    )}
                  </span>
                  <span
                    className={cn('animated', {
                      fadeIn: !data.found,
                      hidden: data.found,
                    })}
                  >
                    {q ? (
                      <>
                        There are no products that match "<strong>{q}</strong>"
                      </>
                    ) : (
                      <>
                        There are no products that match the selected category &
                        designer
                      </>
                    )}
                  </span>
                </>
              ) : q ? (
                <>
                  Searching for: "<strong>{q}</strong>"
                </>
              ) : (
                <>Searching...</>
              )}
            </div>
          )}

          {data ? (
            <Grid layout="normal">
              {data.products.map(({ node }) => (
                <ProductCard
                  variant="simple"
                  key={node.path}
                  className="animated fadeIn mx-auto"
                  product={node}
                  imgWidth={350}
                  imgHeight={500}
                />
              ))}
            </Grid>
          ) : (
            <Grid layout="normal">
              {rangeMap(12, (i) => (
                <Skeleton
                  key={i}
                  className="w-full animated fadeIn"
                  height={325}
                />
              ))}
            </Grid>
          )}
        </div>
        {/* <div className="col-span-2">
          <ul>
            <li className="py-1 text-base font-bold tracking-wide">Sort</li>
            <li
              className={cn('py-1 text-accents-8', {
                underline: !sort,
              })}
            >
              <Link href={{ pathname, query: filterQuery({ q }) }}>
                <a>Relevance</a>
              </Link>
            </li>
            {SORT.map(([key, text]) => (
              <li
                key={key}
                className={cn('py-1 text-accents-8', {
                  underline: sort === key,
                })}
              >
                <Link href={{ pathname, query: filterQuery({ q, sort: key }) }}>
                  <a>{text}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </Container>
  )
}

Search.Layout = Layout
