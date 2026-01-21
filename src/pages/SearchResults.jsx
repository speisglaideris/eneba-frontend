import ProductGrid from "../components/ProductGrid/ProductGrid";

function SearchResults({ products = [], loading = false }) {
    return (
        <>
            <span className="search-results">
              Results found: <strong>{loading ? '...' : products.length}</strong>
            </span>
            <ProductGrid products={products} />
        </>
    );
}

export default SearchResults;