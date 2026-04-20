import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "../shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../store/actions";
import Filter from "./Filter";
import useProductFilter from "../../hooks/useProductFilter";
import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const Products = () => {
    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );
    const { products, categories, pagination } = useSelector(
        (state) => state.products
    )
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    useProductFilter();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCategoryChange = (categoryId) => {
        const newParams = new URLSearchParams(searchParams);
        if (categoryId === "all") {
            newParams.delete("category");
        } else {
            const cat = categories.find(c => c.categoryId === categoryId);
            newParams.set("category", cat ? cat.categoryName : categoryId);
        }
        newParams.set("page", "1");
        setSearchParams(newParams);
    };

    const handleSearchChange = (keyword) => {
        const newParams = new URLSearchParams(searchParams);
        if (keyword) {
            newParams.set("keyword", keyword);
        } else {
            newParams.delete("keyword");
        }
        newParams.set("page", "1");
        setSearchParams(newParams);
    };

    const selectedCategoryName = searchParams.get("category");
    const selectedCategoryId = categories?.find(c => c.categoryName === selectedCategoryName)?.categoryId || "all";
    const searchTerm = searchParams.get("keyword") || "";

    return (
        <div className="bg-background pt-32 pb-20 selection:bg-primary-fixed selection:text-on-primary-fixed">
            {/* Shop Hero Header */}
            <section className="px-8 md:px-12 max-w-screen-2xl mx-auto mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col gap-6"
                >
                    <span className="font-label uppercase tracking-[0.3em] text-primary font-bold text-xs">
                        PRODUCTOS
                    </span>

                    <h1 className="font-headline text-5xl md:text-7xl text-on-surface">
                        Cuidado Natural & Belleza Real
                    </h1>

                    <p className="text-secondary text-lg max-w-2xl font-body leading-relaxed italic opacity-80">
                        Descubre nuestra selección de productos 100% naturales para el cuidado del cabello y la piel. Cada fórmula está pensada para ofrecer resultados visibles, respetando tu bienestar y resaltando tu belleza de forma auténtica.
                    </p>
                </motion.div>
            </section>

            <div className="px-8 md:px-12 max-w-screen-2xl mx-auto">
                {/* Horizontal Filter Bar */}
                <Filter
                    categories={categories || []}
                    selectedCategory={selectedCategoryId}
                    onCategoryChange={handleCategoryChange}
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                />

                {/* Main Content */}
                <main className="w-full">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-[400px]">
                            <Loader />
                        </div>
                    ) : errorMessage ? (
                        <div className="flex flex-col justify-center items-center h-[400px] text-on-surface bg-surface-container-low rounded-xl p-12 text-center border border-outline-variant/10 shadow-inner">
                            <FaExclamationTriangle className="text-4xl mb-6 opacity-30 text-primary" />
                            <h3 className="text-xl font-headline mb-2">Something went wrong</h3>
                            <p className="text-secondary font-body">{errorMessage}</p>
                        </div>
                    ) : (
                        <div className="min-h-[700px]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20">
                                {products && products.length > 0 ? (
                                    products.map((item, i) => (
                                        <motion.div
                                            key={item.productId || i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: i * 0.05 }}
                                        >
                                            <ProductCard {...item} />
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-40 text-center text-secondary font-body italic opacity-60">
                                        No products found matching your selection.
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-center pt-32">
                                <Paginations
                                    numberOfPage={pagination?.totalPages}
                                    totalProducts={pagination?.totalElements}
                                />
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Products;