import { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setSearchQuery } from '@/features/contracts/store/contracts-slice';
import { useTranslation } from 'react-i18next';

export function useContracts() {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const { contracts, searchQuery, loading } = useAppSelector(
    (state) => state.contracts
  );
  const isArabic = i18n.language === 'ar';

  const filteredContracts = useMemo(() => {
    if (!searchQuery.trim()) return contracts;

    const query = searchQuery.toLowerCase();
    return contracts.filter((c) => {
      const title = isArabic ? c.titleAr : c.title;
      return (
        title.toLowerCase().includes(query) ||
        c.companyName.toLowerCase().includes(query) ||
        c.type.toLowerCase().includes(query)
      );
    });
  }, [contracts, searchQuery, isArabic]);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  return {
    contracts: filteredContracts,
    searchQuery,
    loading,
    handleSearch,
    isArabic,
  };
}
