import { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { useTranslation } from 'react-i18next';
import type { Contract } from '@/types/global';

export function useContractDetail(contractId: string) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const contract = useAppSelector((state) =>
    state.contracts.contracts.find((c) => c.id === contractId)
  );

  const localizedContract = useMemo(() => {
    if (!contract) return null;
    return {
      ...contract,
      displayTitle: isArabic ? contract.titleAr : contract.title,
      displayDescription: isArabic
        ? contract.descriptionAr
        : contract.description,
      localizedDrafts: contract.drafts.map((d) => ({
        ...d,
        displayTitle: isArabic ? d.titleAr : d.title,
        displayDescription: isArabic ? d.descriptionAr : d.description,
        displayContent: isArabic ? d.contentAr : d.content,
      })),
    };
  }, [contract, isArabic]);

  return {
    contract: localizedContract,
    isArabic,
  };
}
