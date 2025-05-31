import React, { useState, useEffect } from "react";
import { useCategories } from "@/app/contexts/select-context";
import type { Category } from "@/app/types/category-type";

interface SelectCategoryProps {
  onCategorySelect: (category: Category | null) => void;
  label?: string;
  className?: string;
  initialSelectedId?: string | null;
  placeholder?: string;
}

export default function SelectCategory({
  onCategorySelect,
  label = "Categoria",
  className = "",
  initialSelectedId,
  placeholder = "Selecione ou adicione uma categoria",
}: SelectCategoryProps) {
  const {
    categories,
    selectedCategory: contextSelectedCategory,
    addCategory,
    selectCategory: contextSelectCategory,
    error: contextError,
  } = useCategories();
  const [newCategoryegoryName, setNewCategoryName] = useState("");
  const [showAddCategoryInput, setShowAddCategoryInput] = useState(false);
  const [componentError, setComponentError] = useState<string | null>(null);

  const currentSelectedValue =
    contextSelectedCategory?.id ?? initialSelectedId ?? "";

  useEffect(() => {
    if (initialSelectedId && !contextSelectedCategory) {
      contextSelectCategory(initialSelectedId);
    }
  }, [initialSelectedId, contextSelectedCategory, contextSelectCategory]);

  useEffect(() => {
    setComponentError(contextError);
  }, [contextError]);

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const categoryId = event.target.value;
    setComponentError(null);

    if (categoryId === "add_new") {
      setShowAddCategoryInput(true);
    } else if (categoryId === "") {
      contextSelectCategory(null);
      onCategorySelect(null);
      setShowAddCategoryInput(false);
    } else {
      const foundCategory = categories.find((cat) => cat.id === categoryId);
      if (foundCategory) {
        contextSelectCategory(categoryId);
        onCategorySelect(foundCategory);
      }
      setShowAddCategoryInput(false);
    }
  };

  const handleAddNewCategory = async () => {
    if (newCategoryegoryName.trim() === "") {
      setComponentError("O nome da categoria não pode ser vazio.");
      return;
    }
    try {
      const newCategory = await addCategory(newCategoryegoryName);
      contextSelectCategory(newCategory.id);
      onCategorySelect(newCategory);
      setNewCategoryName("");
      setShowAddCategoryInput(false);
      setComponentError(null);
    } catch (e: any) {
      setComponentError(e.message || "Falha ao adicionar categoria.");
      console.error("Failed to add category:", e);
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor="category-select"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="flex items-center space-x-2">
        <select
          id="category-select"
          value={currentSelectedValue}
          onChange={handleSelectionChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
        >
          <option value="">{placeholder}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
          <option value="add_new" className="font-semibold text-indigo-600">
            -- Adicionar Nova --
          </option>
        </select>
      </div>

      {showAddCategoryInput && (
        <div className="mt-2 flex items-center space-x-2">
          <input
            type="text"
            value={newCategoryegoryName}
            onChange={(e) => {
              setNewCategoryName(e.target.value);
              setComponentError(null);
            }}
            placeholder="Nome da nova categoria"
            className="mt-1 block flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={handleAddNewCategory}
            className="px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap"
          >
            Adicionar
          </button>
        </div>
      )}
      {componentError && (
        <p className="mt-1 text-xs text-red-600">{componentError}</p>
      )}
    </div>
  );
}
