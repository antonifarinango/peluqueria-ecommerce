import React from "react";
import { FiInfo, FiSearch } from "react-icons/fi";

const Filter = ({ categories, selectedCategory, onCategoryChange, searchTerm, onSearchChange }) => {
  return (
    <div className="flex flex-col gap-12 mb-16">
      {/* Top Row: Title and Search */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="w-full md:w-auto">
          <h2 className="font-headline text-4xl mb-2">The Collection</h2>
          <p className="text-secondary text-sm font-body italic opacity-70 italic">Curated essentials for the discerning professional.</p>
        </div>
        
        {/* Search Bar - Refined */}
        <div className="relative w-full md:w-80 group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search the archive..."
            className="w-full bg-surface-container-low border-b border-transparent focus:border-primary px-12 py-4 rounded-xl outline-none font-body text-sm transition-all shadow-sm focus:shadow-md"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Bottom Row: Categories and Info */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onCategoryChange("all")}
            className={`px-6 py-2.5 rounded-full text-[10px] font-label uppercase tracking-[0.2em] transition-all font-bold ${
              selectedCategory === "all"
                ? "bg-primary text-on-primary shadow-lg shadow-primary/20 scale-105"
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.categoryId}
              onClick={() => onCategoryChange(category.categoryId)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-label uppercase tracking-[0.2em] transition-all font-bold ${
                selectedCategory === category.categoryId
                  ? "bg-primary text-on-primary shadow-lg shadow-primary/20 scale-105"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              {category.categoryName}
            </button>
          ))}
        </div>

        {/* Order Info Callout */}
        <div className="bg-surface-container-low p-6 rounded-2xl max-w-md border-l-4 border-primary shadow-sm flex items-start gap-4">
          <FiInfo className="text-primary mt-1 shrink-0" size={20} />
          <div>
            <p className="text-sm text-on-surface font-bold mb-1 italic">Order Information</p>
            <p className="text-[11px] text-secondary leading-relaxed font-body">Our premium collections are available for in-salon purchase or personalized courier delivery via WhatsApp inquiry.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;