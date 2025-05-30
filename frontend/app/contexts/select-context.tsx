import React, { createContext, useState, useContext, useCallback, useMemo, useEffect, type ReactNode } from 'react';
import type { Category } from '@/app/types/category-type';
import { categoryService } from '../services/category-service';
import { useCookies } from 'react-cookie';
interface CategoryContextType {
    categories: Category[];
    selectedCategory: Category | null;
    addCategory: (name: string) => Promise<Category>; 
    selectCategory: (categoryId: string | null) => void;
    isLoading: boolean;
    error: string | null;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

interface CategoryProviderProps {
    children: ReactNode;
}

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryState, setSelectedCategoryState] = useState<Category | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [cookies] = useCookies(["token"]);

    useEffect(() => {
        setIsLoading(true);
        categoryService.getAll(cookies.token)
            .then((data) => {
                setCategories(Array.isArray(data) ? data : []);
                setIsLoading(false);
            })
            .catch((err) => {
                setCategories([]);
                setError('Erro ao carregar categorias');
                setIsLoading(false);
            });
    }, [cookies.token]);

    const addCategory = useCallback(async (name: string): Promise<Category> => {
        const trimmedName = name.trim();
        if (!trimmedName) {
            const err = "O nome da categoria não pode ser vazio.";
            setError(err);
            throw new Error(err);
        }
        if (categories.some(cat => cat.name.toLowerCase() === trimmedName.toLowerCase())) {
            const err = "Essa categoria já existe.";
            setError(err);
            const existingCategory = categories.find(cat => cat.name.toLowerCase() === trimmedName.toLowerCase())!;
            return existingCategory;
        }

        try {
            setIsLoading(true);
            setError(null);
            const newCategory = await categoryService.create({ name: trimmedName } as any, cookies.token) as Category;
            setCategories(prev => [...prev, newCategory]);
            setIsLoading(false);
            return newCategory;
        } catch (err: any) {
            const errorMessage = err.message || 'Erro ao criar categoria.';
            setError(errorMessage);
            setIsLoading(false);
            throw new Error(errorMessage);
        }
    }, [categories, cookies.token]);

    const selectCategory = useCallback((categoryId: string | null) => {
        if (categoryId === null) {
            setSelectedCategoryState(null);
            return;
        }
        const category = categories.find(cat => cat.id === categoryId);
        setSelectedCategoryState(category || null);
    }, [categories]);

    const contextValue = useMemo(() => ({
        categories,
        selectedCategory: selectedCategoryState,
        addCategory,
        selectCategory,
        isLoading,
        error,
    }), [categories, selectedCategoryState, addCategory, selectCategory, isLoading, error]);

    return (
        <CategoryContext.Provider value={contextValue}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategories = (): CategoryContextType => {
    const context = useContext(CategoryContext);
    if (context === undefined) {
        throw new Error('useCategories must be used within a CategoryProvider');
    }
    return context;
};
